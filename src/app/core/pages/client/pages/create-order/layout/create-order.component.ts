import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { OrdersService } from "@features/orders";
import { AlreadyExistComponent } from "@features/orders/ui/already-exist";
import { OrderTypeEnum } from "@graphql";
import { ORDER_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { lastValueFrom, map, take } from "rxjs";

import { CREATE_ORDER_PAGE_I18N } from "../constants";
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
	readonly createOrderPageI18n = CREATE_ORDER_PAGE_I18N;
	readonly orderTypes = ORDER_TYPES;

	private readonly _createOrderPageQuery = this._createOrderPageGQL.watch();

	readonly order$ = this._createOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	schemaRouterLink = "";
	menuRouterLink = "";

	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _createOrderPageGQL: CreateOrderPageGQL
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this.schemaRouterLink = CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId);
		this.menuRouterLink = CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId);

		this._actionsService.setAction({
			label: "Подключиться к заказу",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, placeId));
			}
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.PLACES.absolutePath
		});

		const user = await lastValueFrom(this._authService.me$.pipe(take(1)));

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

		if (!order.data.order) {
			return;
		}

		this._ordersService.setActiveOrderId(order.data.order.id);
	}

	async createOrder({ type, routerLink }: IOrderType) {
		const order = await lastValueFrom(this.order$.pipe(take(1)));

		const result = order?.id
			? await lastValueFrom(this._dialogService.open(AlreadyExistComponent, { data: order }).afterClosed$)
			: "skip";

		if (!result) {
			return;
		}

		if (result === "navigate" && order) {
			await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, order.id));
			return;
		} else if (result === "cancel" && order) {
			await lastValueFrom(this._ordersService.cancelOrder(order.id));
			this._ordersService.setActiveOrderId(undefined);
		}

		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (type === OrderTypeEnum.InPlace) {
			await this._routerService.navigateByUrl(routerLink.replace(PLACE_ID, place));
			return;
		}

		try {
			const result = await lastValueFrom(
				this._ordersService.createOrder({
					type,
					place,
					productsToOrder: await lastValueFrom(this._ordersService.productsToOrders$.pipe(take(1)))
				})
			);

			if (!result.data) {
				return;
			}

			const { id } = result.data.createOrder;

			this._ordersService.setActiveOrderId(id);
			this._ordersService.setProductsToOrders([]);

			await this._routerService.navigateByUrl(routerLink.replace(ORDER_ID, id));
		} catch (error) {
			console.error(error);
		}
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
