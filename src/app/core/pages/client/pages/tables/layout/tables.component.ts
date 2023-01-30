import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map, of, switchMap } from "rxjs";

import { TABLES_PAGE } from "../constants";
import { TablesPageOrderGQL } from "../graphql";
import { TablesPageService } from "../services";

@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	readonly tablesPage = TABLES_PAGE;

	readonly tables$ = this._tablesPageService.tablesPageQuery.valueChanges.pipe(
		map((result) => result.data.tables.data),
		switchMap((tables) =>
			this._ordersService.activeOrderId$.pipe(
				switchMap((orderId) =>
					orderId
						? this._tablesPageOrderGQL.watch({ orderId }).valueChanges.pipe(map((result) => result.data?.order))
						: of(null)
				),
				map((order) => (tables || []).map((table) => ({ ...table, active: table.id === order?.table?.id })))
			)
		)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _tablesPageService: TablesPageService,
		private readonly _tablesPageOrderGQL: TablesPageOrderGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
