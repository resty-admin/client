import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { switchMap, take } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { ActionsService } from "../../../../../../features/actions";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit, OnDestroy {
	readonly clientRoutes = CLIENT_ROUTES;
	readonly order$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._ordersService.getOrder(id)));

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.ORDERS.absolutePath);

		this._actionsService.setAction({
			label: "Выбрать тип оплаты",
			action: () =>
				this.order$
					.pipe(take(1))
					.subscribe(async (order) =>
						this._routerService.navigateByUrl(CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(DYNAMIC_ID, order.id))
					)
		});

		this.order$.pipe(take(1)).subscribe((order) => {
			this._ordersService.setActiveOrder(order as any);
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
