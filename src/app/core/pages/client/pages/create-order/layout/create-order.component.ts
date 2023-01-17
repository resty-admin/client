import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { ORDER_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { OrdersService } from "../../../../../../features/orders";
import { CREATE_ORDER_PAGE_I18N } from "../constants";
import { ORDER_TYPES } from "../data";
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

	schemaRouterLink = "";
	menuRouterLink = "";

	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this.schemaRouterLink = CLIENT_ROUTES.SCHEMA.absolutePath.replace(PLACE_ID, placeId);
		this.menuRouterLink = CLIENT_ROUTES.MENU.absolutePath.replace(PLACE_ID, placeId);

		this._actionsService.setAction({
			label: "Подключиться к заказу",
			func: async () => {
				const placeId = this._routerService.getParams(PLACE_ID.slice(1));
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, placeId));
			}
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.PLACES.absolutePath
		});
	}

	async createOrder({ type, routerLink }: IOrderType) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (type === OrderTypeEnum.InPlace) {
			await this._routerService.navigateByUrl(routerLink.replace(PLACE_ID, place));
			return;
		}

		try {
			const order = await lastValueFrom(
				this._ordersService.createOrder({ type, place }).pipe(map((result) => result.data?.createOrder))
			);

			if (!order) {
				return;
			}

			this._ordersService.setActiveOrderId(order.id);

			await this._routerService.navigateByUrl(routerLink.replace(ORDER_ID, order.id));
		} catch (error) {
			console.error(error);
		}
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
