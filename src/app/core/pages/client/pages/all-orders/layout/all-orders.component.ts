import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, shareReplay } from "rxjs";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

import { DYNAMIC_ID } from "../../../../../../shared/constants";
import { ALL_ORDERS_PAGE_I18N } from "../constants";
import { AllOrdersPageGQL } from "../graphql/all-orders-page";

@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements OnInit {
	readonly allOrdersPageI18n = ALL_ORDERS_PAGE_I18N;
	readonly clienRoutes = CLIENT_ROUTES;
	readonly dynamicId = DYNAMIC_ID;

	private readonly _allOrdersPageQuery = this._allOrdersPageGQL.watch();
	private readonly _allOrders$ = this._allOrdersPageQuery.valueChanges.pipe(shareReplay({ refCount: true }));
	readonly historyOrders$ = this._allOrders$.pipe(map((result) => result.data.historyOrders.data));
	readonly orders$ = this._allOrders$.pipe(map((result) => result.data.orders.data));

	constructor(
		private readonly _allOrdersPageGQL: AllOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);
	}
}
