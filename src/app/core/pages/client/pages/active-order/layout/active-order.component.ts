import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map, take, tap } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { ORDER_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { SocketIoService } from "../../../../../../shared/modules/socket-io";
import { ACTIVE_ORDER_PAGE_I18N } from "../constants";
import { ActiveOrderPageGQL } from "../graphql/active-order-page";

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
	readonly placeId = PLACE_ID;
	readonly activeOrderPageI18n = ACTIVE_ORDER_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly usersControl = new FormControl<Record<string, boolean>>();
	readonly productsControl = new FormControl();
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly order$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _socketIoService: SocketIoService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._socketIoService
			.fromEvents(Object.values(ORDERS_EVENTS))
			.pipe(untilDestroyed(this))
			.subscribe(async () => {
				await this._activeOrderPageQuery.refetch();
			});

		this.usersControl.valueChanges
			.pipe(
				untilDestroyed(this),
				tap(async (usersMap) => {
					const order = await lastValueFrom(this.order$.pipe(take(1)));
					const productsByUser = Object.keys(this.productsControl.value || {}).reduce((productsMap, id) => {
						const userId = (order.productsToOrders || []).find((productToOrder) => productToOrder.id === id)?.user.id;

						const users = Object.keys(usersMap);

						return {
							...productsMap,
							[id]: userId && (users || []).includes(userId)
						};
					}, {});

					this.productsControl.patchValue(productsByUser);
				})
			)
			.subscribe();

		this.order$.pipe(untilDestroyed(this)).subscribe((order) => {
			this._breadcrumbsService.setBreadcrumb({
				label: "В меню",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});
		});

		this._actionsService.setAction({
			label: "Выбрать тип оплаты",
			func: async () => {
				const products = Object.entries(this.productsControl.value || {})
					.filter(([_, value]) => value)
					.map(([key]) => key);

				await this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(ORDER_ID, orderId)], {
					queryParams: { products: JSON.stringify(products) }
				});
			}
		});

		this._ordersService.setActiveOrderId(orderId);

		await this._activeOrderPageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
