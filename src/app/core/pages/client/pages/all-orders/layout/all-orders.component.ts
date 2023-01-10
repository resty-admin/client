import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OrdersService } from "src/app/features/orders";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

import { DYNAMIC_ID } from "../../../../../../shared/constants";

@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements OnInit {
	readonly orders$ = this._ordersService.orders$;
	readonly clienRoutes = CLIENT_ROUTES;
	readonly dynamicId = DYNAMIC_ID;

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath);
	}
}
