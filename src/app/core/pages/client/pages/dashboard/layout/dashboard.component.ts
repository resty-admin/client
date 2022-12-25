import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@UntilDestroy()
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);
	}

	get orderTypes() {
		return [
			{
				label: "Заказать в заведении",
				routerLink: CLIENT_ROUTES.CODE.absolutePath,
				image: "in-place"
			},
			{
				label: "На вынос",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath,
				image: "to-go"
			},
			{
				label: "Доставка",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath,
				image: "delivery"
			},
			{
				label: "Бронировать",
				routerLink: CLIENT_ROUTES.HALLS.absolutePath,
				image: "booking"
			}
		].map((orderType) => ({ ...orderType, routerLink: orderType.routerLink.replace(PLACE_ID, this.placeId) }));
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
