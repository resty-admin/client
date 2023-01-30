import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { ACTIVE_ORDERS_PAGE } from "../constants";
import { ActiveOrdersPageService } from "../services";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly activeOrdersPage = ACTIVE_ORDERS_PAGE;
	readonly historyOrdersLink = CLIENT_ROUTES.HISTORY_ORDERS.absolutePath;
	readonly activeOrders$ = this._activeOrdersPageService.activeOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.orders.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _activeOrdersPageService: ActiveOrdersPageService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService
	) {}

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
