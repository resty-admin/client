import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { HISTORY_ORDERS_PAGE } from "../constants";
import { HistoryOrdersPageService } from "../services";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements OnInit, OnDestroy {
	readonly historyOrdersPage = HISTORY_ORDERS_PAGE;

	historyOrders$ = this._historOrdersPageService.historyOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.historyOrders.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _historOrdersPageService: HistoryOrdersPageService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.ACTIVE_ORDERS.absolutePath });

		this._actionsService.setAction({
			label: "Создать заказ",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
