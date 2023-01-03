import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { switchMap, take } from "rxjs";
import { PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { OrdersService } from "../../../../../../features/orders";
import { AuthService } from "../../../../auth/services";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	readonly orderTypes = [
		{
			label: "Заказать в заведении",
			type: OrderTypeEnum.InPlace,
			link: CLIENT_ROUTES.CODE.absolutePath,
			image: "in-place"
		},
		{
			label: "На вынос",
			type: OrderTypeEnum.Pickup,
			link: CLIENT_ROUTES.CATEGORIES.absolutePath,
			image: "to-go"
		},
		{
			label: "Доставка",
			type: OrderTypeEnum.Delivery,
			link: CLIENT_ROUTES.CATEGORIES.absolutePath,
			image: "delivery"
		},
		{
			label: "Бронировать",
			type: OrderTypeEnum.Reserve,
			link: CLIENT_ROUTES.HALLS.absolutePath,
			image: "booking"
		}
	];

	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);
	}

	createOrder({ type, link }: any) {
		this._authService
			.getMe()
			.pipe(
				take(1),
				switchMap(() => this._ordersService.createOrder({ type, place: this.placeId, totalPrice: 250 })),
				take(1)
			)
			.subscribe(async () => {
				await this._routerService.navigateByUrl(link.replace(PLACE_ID, this.placeId));
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
}
