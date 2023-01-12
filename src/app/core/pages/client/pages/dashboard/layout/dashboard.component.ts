import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of, switchMap, take } from "rxjs";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { AuthService } from "../../../../../../features/auth/services";
import { OrdersService } from "../../../../../../features/orders";
import { DASHBOARD_PAGE_I18N } from "../constants";
import { ORDER_TYPES } from "../data";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	readonly dashboardPageI18n = DASHBOARD_PAGE_I18N;
	readonly orderTypes = ORDER_TYPES;

	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);
	}

	createOrder({ type }: any) {
		this._authService
			.getMe()
			.pipe(
				take(1),
				switchMap((user: any) =>
					type !== OrderTypeEnum.InPlace
						? this._ordersService.createOrder({
								users: [user.id],
								type,
								place: this.placeId
						  })
						: of({})
				),
				take(1)
			)
			.subscribe(async (order: any) => {
				const navigateUrl = order?.id
					? CLIENT_ROUTES.REFERRAL_LINK.absolutePath.replace(DYNAMIC_ID, order.id)
					: CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath;
				await this._routerService.navigateByUrl(navigateUrl);
			});
	}

	get placeId() {
		return this._routerService.getParams(PLACE_ID.slice(1)) || "";
	}

	get schemaRouterLink() {
		return CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, this.placeId);
	}

	get menuRouterLink() {
		return CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, this.placeId);
	}

	get connectToOrderRouterLink() {
		return CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, this.placeId);
	}
}
