import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { OrdersService } from "src/app/features/orders";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@UntilDestroy()
@Component({
	selector: "app-orders",
	templateUrl: "./orders.component.html",
	styleUrls: ["./orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
	readonly orders$ = this._ordersService.orders$;

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath);
	}
}
