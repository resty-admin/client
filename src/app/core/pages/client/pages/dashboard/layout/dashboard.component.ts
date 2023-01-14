import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { OrdersService } from "../../../../../../features/orders";
import { DASHBOARD_PAGE_I18N } from "../constants";
import { ORDER_TYPES } from "../data";
import type { IOrderType } from "../intefaces";

@UntilDestroy()
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
	readonly dashboardPageI18n = DASHBOARD_PAGE_I18N;
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

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe((placeId) => {
				this.schemaRouterLink = CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId);
				this.menuRouterLink = CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId);
			});

		this._actionsService.setAction({
			label: "Подключиться к заказу",
			action: async () => {
				const placeId = this._routerService.getParams(PLACE_ID.slice(1));
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, placeId));
			}
		});

		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);
	}

	async createOrder({ type, routerLink }: IOrderType) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (type === OrderTypeEnum.InPlace) {
			await this._routerService.navigateByUrl(routerLink.replace(PLACE_ID, place));
			return;
		}

		this._ordersService
			.createOrder({ type, place })
			.pipe(
				take(1),
				map((result) => result.data?.createOrder)
			)
			.subscribe(async (order) => {
				if (!order) {
					return;
				}

				this._ordersService.setActiveOrderId(order.id);

				await this._routerService.navigateByUrl(routerLink.replace(DYNAMIC_ID, order.id));
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBackUrl(null);
	}
}
