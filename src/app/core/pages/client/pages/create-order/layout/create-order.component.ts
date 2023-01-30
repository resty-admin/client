import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { OrdersService } from "@features/orders";
import { AlreadyExistComponent } from "@features/orders/ui/already-exist";
import { ORDER_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { filter, from, map, shareReplay, switchMap, take } from "rxjs";

import { CREATE_ORDER_PAGE } from "../constants";
import { ORDER_TYPES } from "../data";
import { CreateOrderPageGQL } from "../graphql";
import type { IOrderType } from "../intefaces";

@Component({
	selector: "app-create-order",
	templateUrl: "./create-order.component.html",
	styleUrls: ["./create-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderComponent implements OnInit, OnDestroy {
	readonly createOrderPage = CREATE_ORDER_PAGE;
	readonly orderTypes = ORDER_TYPES;

	private readonly _createOrderPageQuery = this._createOrderPageGQL.watch();

	readonly order$ = this._createOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	schemaRouterLink = "";
	menuRouterLink = "";

	readonly withData$ = this._ordersService.productsToOrders$.pipe(
		map((productsToOrders) => productsToOrders.length > 0),
		shareReplay({ refCount: true })
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _createOrderPageGQL: CreateOrderPageGQL
	) {}

	ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this.schemaRouterLink = CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId);
		this.menuRouterLink = CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId);

		this._actionsService.setAction({
			label: "Подключиться к заказу",
			func: () =>
				this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, placeId))
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.PLACES.absolutePath
		});

		this._authService.me$.pipe(take(1)).subscribe(async (user) => {
			if (!user) {
				return;
			}

			const order = await this._createOrderPageQuery.refetch({
				filtersArgs: [
					{
						key: "place.id",
						operator: "=",
						value: placeId
					},
					{
						key: "users.id",
						operator: "=[]",
						value: user.id
					}
				]
			});

			this._ordersService.setActiveOrderId(order.data.order?.id);
		});
	}

	createOrder({ type, routerLink }: IOrderType) {
		const activeOrderUrl = CLIENT_ROUTES.ACTIVE_ORDER.absolutePath;

		this.order$
			.pipe(
				take(1),
				switchMap((order) =>
					this._dialogService.open(AlreadyExistComponent, { data: order }).afterClosed$.pipe(
						take(1),
						filter((result) => Boolean(result)),
						switchMap((result) =>
							result === "navigate"
								? from(this._routerService.navigateByUrl(activeOrderUrl.replace(ORDER_ID, order!.id)))
								: result === "navigate"
								? this._ordersService.cancelOrder(order!.id).pipe(map((result) => result.data?.cancelOrder))
								: this._ordersService.productsToOrders$.pipe(
										take(1),
										switchMap((productsToOrder) =>
											this._ordersService
												.createOrder({
													type,
													place: this._routerService.getParams(PLACE_ID.slice(1)),
													productsToOrder: productsToOrder.map((productToOrder) => ({
														productId: productToOrder.productId,
														count: productToOrder.count,
														attributesIds: productToOrder.attributesIds
													}))
												})
												.pipe(map((result) => result.data?.createOrder))
										)
								  )
						),
						take(1)
					)
				),
				take(1)
			)
			.subscribe(async (result) => {
				if (!result || typeof result === "boolean" || typeof result === "string") {
					return;
				}

				this._ordersService.setActiveOrderId(result.id);
				this._ordersService.setProductsToOrders([]);

				await this._routerService.navigateByUrl(routerLink.replace(ORDER_ID, result.id));
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
