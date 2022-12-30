import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { switchMap } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@UntilDestroy()
@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
	readonly table$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._ordersService.getOrder(id)));

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.ORDERS.absolutePath);
	}
}
