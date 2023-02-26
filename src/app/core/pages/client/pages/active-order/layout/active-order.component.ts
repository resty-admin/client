import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CommandsDialogComponent, CommandsService } from "@features/commands";
import { CancelConfirmationComponent, OrdersService } from "@features/orders";
import { CloseConfirmationComponent } from "@features/orders/ui";
import type { IOrderInfo } from "@features/orders/ui/order-info/interfaces";
import type { ActiveOrderEntity } from "@graphql";
import { OrdersEvents, ProductToOrderPaidStatusEnum, ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SocketIoService } from "@shared/modules/socket-io";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { IosDatepickerDialogComponent } from "@shared/ui/ios-datepicker-dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, switchMap, take } from "rxjs";

import { WaitingForConfirmComponent } from "../components";
import type { ActiveOrderPageQuery } from "../graphql";
import { ActiveOrderPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly activeOrder$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	selectedUsers: string[] = [];
	selectedProductsToOrders: string[] = [];

	isAllPaid = false;

	constructor(
		readonly sharedService: SharedService,
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService,
		private readonly _dialogService: DialogService,
		private readonly _commandsService: CommandsService,
		private readonly _socketIoService: SocketIoService,
		private readonly _toastrService: ToastrService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));
		await this._activeOrderPageQuery.setVariables({ orderId });

		this.activeOrder$.pipe(untilDestroyed(this)).subscribe((result) => {
			this.isAllPaid =
				(result?.productsToOrders || []).filter(
					(productToOrder) => productToOrder.paidStatus !== ProductToOrderPaidStatusEnum.Paid
				).length === 0;

			const isWaitingForConfirm = localStorage.getItem("waitingForConfirm");

			if (!isWaitingForConfirm && (result?.productsToOrders || []).length > 0) {
				this._dialogService
					.open(WaitingForConfirmComponent)
					.afterClosed$.pipe(take(1))
					.subscribe(() => {
						localStorage.setItem("waitingForConfirm", "true");
					});
			}
		});

		this._ordersService.setActiveOrderId(orderId);

		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			this._breadcrumbsService.setBreadcrumb({
				label: "BACK_TO_MENU",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, activeOrder!.place.id)
			});
		});

		this._authService.me$.pipe(take(1)).subscribe(async (user) => {
			if (!user) {
				return;
			}

			await this.setSelectedUsers([...this.selectedUsers, user.id]);
			await this.setSelectedProductsToOrders(this.selectedProductsToOrders);
		});

		this._socketIoService
			.fromEvents(Object.values(OrdersEvents))
			.pipe(
				untilDestroyed(this),
				filter((order: any) => order.id === orderId),
				switchMap(() => this._activeOrderPageQuery.refetch())
			)
			.subscribe();

		this.setAction();
	}

	openIosDatepicker(data: IOrderInfo) {
		this._dialogService
			.open(IosDatepickerDialogComponent, {
				data,
				windowClass: "ios-datepicker-dialog"
			})
			.afterClosed$.pipe(
				take(1),
				filter((date) => Boolean(date)),
				switchMap((startDate) =>
					this._ordersService.updateOrder({
						id: this._routerService.getParams(ORDER_ID.slice(1)),
						startDate
					})
				)
			)
			.subscribe();
	}

	openCommandsDialog(order: ActiveOrderPageQuery["order"]) {
		this._dialogService
			.open(CommandsDialogComponent, {
				data: { placeId: order?.place.id }
			})
			.afterClosed$.pipe(
				take(1),
				filter((commandId) => Boolean(commandId)),
				switchMap((commandId) => this._commandsService.emitCommand(commandId, order?.id || ""))
			)
			.subscribe(() => {
				this._toastrService.success(undefined, { data: { title: "Запит відправлено" } });
			});
	}

	setSelectedUsers(usersIds: string[]) {
		this.selectedUsers = usersIds;

		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			this.selectedProductsToOrders = (activeOrder?.productsToOrders || [])
				.filter(
					(productToOrder) =>
						usersIds.includes(productToOrder.user.id) &&
						productToOrder.paidStatus === ProductToOrderPaidStatusEnum.NotPaid &&
						productToOrder.status !== ProductToOrderStatusEnum.WaitingForApprove
				)
				.map((productToOrder) => productToOrder.id);

			this.setAction();
		});
	}

	setSelectedProductsToOrders(productsToOrdersIds: string[]) {
		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			const productsByUser = (activeOrder?.users || []).reduce(
				(usersMap, user) => ({
					...usersMap,
					[user.id]: (activeOrder?.productsToOrders || [])
						.filter((productToOrder: any) => productToOrder.user.id === user.id)
						.every(
							(productToOrder) =>
								productsToOrdersIds.includes(productToOrder.id) &&
								productToOrder.paidStatus === ProductToOrderPaidStatusEnum.NotPaid &&
								productToOrder.status !== ProductToOrderStatusEnum.WaitingForApprove
						)
				}),
				{}
			);

			this.selectedUsers = Object.entries(productsByUser)
				.filter(([_, value]) => value)
				.map(([key]) => key);

			this.setAction();
		});
	}

	setAction() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			if (!activeOrder) {
				return;
			}

			const price = (activeOrder.productsToOrders || [])
				.filter(
					(productToOrder) =>
						this.selectedProductsToOrders.includes(productToOrder.id) &&
						productToOrder.paidStatus === ProductToOrderPaidStatusEnum.NotPaid
				)
				.reduce(
					(pre, curr) =>
						pre +
						curr.product.price * curr.count +
						(curr.attributesToProduct || [])?.reduce((_pre, _curr) => _pre + _curr.attribute.price * _curr.count, 0),
					0
				);

			this._actionsService.setAction({
				original: true,
				label: `До сплати: ${price}грн`,
				disabled: this.selectedProductsToOrders.length === 0,
				func: () =>
					this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(ORDER_ID, orderId)], {
						queryParams: { products: JSON.stringify(this.selectedProductsToOrders) }
					})
			});
		});
	}

	openCancelConfirmation(data: DeepPartial<ActiveOrderEntity>) {
		this._dialogService
			.open(CancelConfirmationComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result?.id)),
				switchMap((result) => this._ordersService.cancelOrder(result.id))
			)
			.subscribe(async () => {
				this._ordersService.setActiveOrderId(undefined);

				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			});
	}

	openCloseConfirmation(data: DeepPartial<ActiveOrderEntity>) {
		this._dialogService
			.open(CloseConfirmationComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result?.id)),
				switchMap((result) => this._ordersService.closeOrder(result.id))
			)
			.subscribe(async () => {
				this._ordersService.setActiveOrderId(undefined);

				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
