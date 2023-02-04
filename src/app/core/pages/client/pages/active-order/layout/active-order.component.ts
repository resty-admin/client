import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CommandsDialogComponent, CommandsService } from "@features/commands";
import { CancelConfirmationComponent, OrdersService } from "@features/orders";
import { CloseConfirmationComponent } from "@features/orders/ui";
import type { ActiveOrderEntity } from "@graphql";
import { ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { OrdersEvents } from "@shared/enums";
import type { DeepPartial } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SocketIoService } from "@shared/modules/socket-io";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { IosDatepickerDialogComponent } from "@shared/ui/ios-datepicker-dialog";
import dayjs from "dayjs";
import { filter, map, switchMap, take } from "rxjs";

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
		private readonly _socketIoService: SocketIoService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));
		await this._activeOrderPageQuery.setVariables({ orderId });

		// this.isAllPaid = (this.activeOrder?.productsToOrders || []).every(
		// 	(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
		// );

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
				filter(({ order }: any) => order.id === orderId),
				switchMap(() => this._activeOrderPageQuery.refetch())
			)
			.subscribe();

		this.setAction();
	}

	openIosDatepicker(data: string) {
		this._dialogService
			.open(IosDatepickerDialogComponent, {
				data: dayjs(data),
				windowClass: "ios-datepicker-dialog"
			})
			.afterClosed$.pipe(take(1))
			.subscribe((date) => {
				if (!date) {
					return;
				}

				console.log("newDate", date);
			});
	}

	openCommandsDialog(order: ActiveOrderPageQuery["order"]) {
		this._dialogService
			.open(CommandsDialogComponent, {
				data: { placeId: order?.place.id }
			})
			.afterClosed$.pipe(
				take(1),
				filter((commandId) => Boolean(commandId))
			)
			.subscribe((commandId) => {
				this._commandsService.emitCommand(commandId);
			});
	}

	setSelectedUsers(usersIds: string[]) {
		this.selectedUsers = usersIds;

		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			this.selectedProductsToOrders = (activeOrder?.productsToOrders || [])
				.filter(
					(productToOrder: any) => usersIds.includes(productToOrder.user.id) && productToOrder.paidStatus !== "PAID"
				)
				.map((productToOrder: any) => productToOrder.id);

			this.setAction();
		});
	}

	setSelectedProductsToOrders(productsToOrdersIds: string[]) {
		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			const productsByUser = (activeOrder?.users || []).reduce(
				(usersMap: any, user: any) => ({
					...usersMap,
					[user.id]: (activeOrder?.productsToOrders || [])
						.filter((productToOrder: any) => productToOrder.user.id === user.id)
						.every(
							(productToOrder: any) =>
								productsToOrdersIds.includes(productToOrder.id) && productToOrder.paidStatus === "NOT_PAID"
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

		this._actionsService.setAction({
			label: "SELECT_PAYMENT_TYPE",
			disabled: this.selectedProductsToOrders.length === 0,
			func: () =>
				this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(ORDER_ID, orderId)], {
					queryParams: { products: JSON.stringify(this.selectedProductsToOrders) }
				})
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
