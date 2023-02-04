import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map, of, switchMap } from "rxjs";

import { TablesPageGQL, TablesPageOrderGQL } from "../graphql";

@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();
	readonly tables$ = this._tablesPageQuery.valueChanges.pipe(
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
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _tablesPageOrderGQL: TablesPageOrderGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	async ngOnInit() {
		const { placeId, hallId } = this._routerService.getParams();

		await this._tablesPageQuery.setVariables({
			filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId)
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
