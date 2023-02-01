import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CommandsDialogComponent, CommandsService } from "@features/commands";
import { CancelConfirmationComponent, OrdersService } from "@features/orders";
import { CloseConfirmationComponent } from "@features/orders/ui";
import type { ActiveOrderEntity } from "@graphql";
import { ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { filter, map, switchMap, take } from "rxjs";

import { ACTIVE_ORDER_PAGE } from "../constants";
import type { ActiveOrderPageQuery } from "../graphql";
import { ActiveOrderPageService } from "../services";

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly activeOrderPage = ACTIVE_ORDER_PAGE;
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	readonly activeOrder$ = this._activeOrderPageService.activeOrderPageQuery.valueChanges.pipe(
		map((result) => result.data.order)
	);

	selectedUsers: string[] = [];
	selectedProductsToOrders: string[] = [];

	isAllPaid = false;

	constructor(
		readonly sharedService: SharedService,
		private readonly _activeOrderPageService: ActiveOrderPageService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService,
		private readonly _dialogService: DialogService,
		private readonly _commandsService: CommandsService
	) {}

	ngOnInit() {
		// this.isAllPaid = (this.activeOrder?.productsToOrders || []).every(
		// 	(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
		// );

		this._ordersService.setActiveOrderId(this._routerService.getParams(ORDER_ID.slice(1)));

		this.activeOrder$.pipe(take(1)).subscribe((activeOrder) => {
			this._breadcrumbsService.setBreadcrumb({
				label: "В меню",
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

		this.setAction();
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
			label: "Выбрать тип оплаты",
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
