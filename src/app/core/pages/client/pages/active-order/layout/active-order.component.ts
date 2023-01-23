import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { OrdersService } from "@features/orders";
import type { ActiveOrderEntity } from "@graphql";
import { ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SocketIoService } from "@shared/modules/socket-io";
import { lastValueFrom, map, take } from "rxjs";

import { ACTIVE_ORDER_PAGE_I18N } from "../constants";
import { ActiveOrderPageGQL } from "../graphql";

export enum ORDERS_EVENTS {
	CREATED = "ORDER_CREATED",
	CLOSED = "ORDER_CLOSED",
	CANCELED = "ORDER_CANCELED",
	CONFIRM = "ORDER_CONFIRM",
	REJECTED = "ORDER_REJECTED",
	APPROVED = "ORDER_APPROVED",
	WAITING_FOR_MANUAL_PAY = "ORDER_WAITING_FOR_MANUAL_PAY",
	USER_ADDED = "ORDER_USER_ADDED",
	TABLE_ADDED = "ORDER_TABLE_ADDED",
	TABLE_APPROVED = "ORDER_TABLE_APPROVED",
	TABLE_REJECTED = "ORDER_TABLE_REJECTED",
	TABLE_REMOVED = "ORDER_TABLE_REMOVED"
}

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly activeOrderPageI18n = ACTIVE_ORDER_PAGE_I18N;
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch(undefined, { fetchPolicy: "network-only" });
	readonly order$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	selectedUsers: string[] = [];
	selectedProductsToOrders: string[] = [];
	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _socketIoService: SocketIoService,
		private readonly _authService: AuthService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._ordersService.setActiveOrderId(orderId);

		this._socketIoService
			.fromEvents<{ order: ActiveOrderEntity }>(Object.values(ORDERS_EVENTS))
			.pipe(untilDestroyed(this))
			.subscribe(async (data) => {
				if (!data || !data.order || !orderId || orderId !== data.order.id) {
					return;
				}

				await this._activeOrderPageQuery.refetch();
			});

		lastValueFrom(this.order$.pipe(take(1))).then((order) => {
			this._breadcrumbsService.setBreadcrumb({
				label: "В меню",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});
		});

		lastValueFrom(this._authService.me$.pipe(take(1))).then(async (user) => {
			if (!user) {
				return;
			}

			await this.setSelectedUsers([...this.selectedUsers, user.id]);
			await this.setSelectedProductsToOrders(this.selectedProductsToOrders);
		});

		this._activeOrderPageQuery.setVariables({ orderId }).then();

		this.setAction().then();
	}

	async setSelectedUsers(usersIds: string[]) {
		this.selectedUsers = usersIds;
		const { productsToOrders } = await lastValueFrom(this.order$.pipe(take(1)));

		this.selectedProductsToOrders = (productsToOrders || [])
			.filter((productToOrder) => usersIds.includes(productToOrder.user.id) && productToOrder.paidStatus === "NOT_PAID")
			.map((productToOrder) => productToOrder.id);

		await this.setAction();
	}

	async setSelectedProductsToOrders(productsToOrdersIds: string[]) {
		const { productsToOrders, users } = await lastValueFrom(this.order$.pipe(take(1)));

		const productsByUser = (users || []).reduce(
			(usersMap, user) => ({
				...usersMap,
				[user.id]: (productsToOrders || [])
					.filter((productToOrder) => productToOrder.user.id === user.id)
					.every(
						(productToOrder) =>
							productsToOrdersIds.includes(productToOrder.id) && productToOrder.paidStatus === "NOT_PAID"
					)
			}),
			{}
		);

		this.selectedUsers = Object.entries(productsByUser)
			.filter(([_, value]) => value)
			.map(([key]) => key);

		await this.setAction();
	}

	async setAction() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._actionsService.setAction({
			label: "Выбрать тип оплаты",
			disabled: this.selectedProductsToOrders.length === 0,
			func: async () => {
				await this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(ORDER_ID, orderId)], {
					queryParams: { products: JSON.stringify(this.selectedProductsToOrders) }
				});
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
