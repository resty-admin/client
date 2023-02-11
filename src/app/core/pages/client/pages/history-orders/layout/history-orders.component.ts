import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { HistoryOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements OnInit, OnDestroy {
	private readonly _historyOrdersPageQuery = this._historyOrdersPageGQL.watch();
	readonly historyOrders$ = this._historyOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.clientHistoryOrders.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.ACTIVE_ORDERS.absolutePath });

		this._actionsService.setAction({
			label: "CREATE_ORDER",
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
