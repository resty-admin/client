import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { CLIENT_ROUTES, ORDER_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

import { ActionsService } from "../../../../../../features/app";
import { RouterService } from "../../../../../../shared/modules/router";
import { ALL_ORDERS_PAGE_I18N } from "../constants";
import { AllOrdersPageGQL } from "../graphql/all-orders-page";

@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements OnInit, OnDestroy {
	readonly allOrdersPageI18n = ALL_ORDERS_PAGE_I18N;
	readonly clienRoutes = CLIENT_ROUTES;
	readonly orderId = ORDER_ID;

	private readonly _allOrdersPageQuery = this._allOrdersPageGQL.watch();
	private readonly _allOrders$ = this._allOrdersPageQuery.valueChanges;
	readonly historyOrders$ = this._allOrders$.pipe(map((result) => result.data.historyOrders.data));
	readonly orders$ = this._allOrders$.pipe(map((result) => result.data.orders.data));

	constructor(
		private readonly _allOrdersPageGQL: AllOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService
	) {}

	trackByFn(index: number) {
		return index;
	}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.PLACES.absolutePath });
		this._actionsService.setAction({
			label: "Создать заказ",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			}
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
