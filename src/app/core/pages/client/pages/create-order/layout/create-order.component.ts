import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { OrdersService } from "@features/orders";
import { AlreadyExistComponent } from "@features/orders/ui/already-exist";
import { OrderTypeEnum } from "@graphql";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { ORDER_TYPES } from "@shared/data";
import type { IOrderType } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { filter, map, shareReplay, switchMap, take } from "rxjs";

import { CreateOrderPageGQL, CreateOrderPagePlaceGQL } from "../graphql";

@Component({
	selector: "app-create-order",
	templateUrl: "./create-order.component.html",
	styleUrls: ["./create-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderComponent implements OnInit, OnDestroy {
	private readonly _createOrderPageQuery = this._createOrderPageGQL.watch();
	private readonly _createOrderPagePlaceQuery = this._createOrderPagePlaceGQL.watch();

	readonly order$ = this._createOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	schemaRouterLink = "";
	menuRouterLink = "";

	isConfirm = false;

	readonly withData$ = this._ordersService.productsToOrders$.pipe(
		map((productsToOrders) => productsToOrders.length > 0),
		shareReplay({ refCount: true })
	);

	readonly orderTypes$ = this._createOrderPagePlaceQuery.valueChanges.pipe(
		map((result) => result.data.place),
		map((place) =>
			ORDER_TYPES.map((orderType) => ({
				...orderType,
				disabled: !place.a11y[orderType.a11y]
			}))
		)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _createOrderPageGQL: CreateOrderPageGQL,
		private readonly _createOrderPagePlaceGQL: CreateOrderPagePlaceGQL
	) {}

	async ngOnInit() {
		this.isConfirm = this._routerService.getQueryParams("from");

		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this.schemaRouterLink = CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId);
		this.menuRouterLink = CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId);

		this._actionsService.setAction({
			label: "CONNECT_TO_ORDER",
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

		await this._createOrderPagePlaceQuery.setVariables({ placeId });
	}

	async createOrder({ type, routerLink }: IOrderType) {
		const result = this._createOrderPageQuery.getLastResult();

		if (result?.data.order) {
			this._dialogService
				.open(AlreadyExistComponent, { data: result.data.order })
				.afterClosed$.pipe(
					take(1),
					filter((result) => Boolean(result)),
					switchMap((order) =>
						this._ordersService.cancelOrder(order.id).pipe(map((result) => result.data?.cancelOrder))
					)
				)
				.subscribe(() => {
					this._createOrderPageQuery.resetLastResults();
					this._ordersService.setActiveOrderId(undefined);
					this._ordersService.setProductsToOrders([]);
				});

			return;
		}

		if (type === OrderTypeEnum.InPlace) {
			await this._routerService.navigateByUrl(
				routerLink.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
			);

			return;
		}

		this._ordersService.productsToOrders$
			.pipe(
				take(1),
				switchMap((productsToOrder) =>
					this._ordersService.createOrder({
						type,
						place: this._routerService.getParams(PLACE_ID.slice(1)),
						productsToOrder: productsToOrder.map((productToOrder) => ({
							productId: productToOrder.productId,
							count: productToOrder.count,
							attributesIds: Object.values(productToOrder.attributesIds).flat()
						}))
					})
				),
				map((result) => result.data?.createOrder)
			)
			.subscribe(async (result) => {
				if (!result) {
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
