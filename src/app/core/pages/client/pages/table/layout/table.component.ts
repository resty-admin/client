import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { switchMap, take } from "rxjs";
import { TablesService } from "src/app/features/tables";
import { DYNAMIC_ID, HALL_ID, PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { ActionsService } from "../../../../../../features/actions";
import { OrdersService } from "../../../../../../features/orders";

@UntilDestroy()
@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
	readonly table$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._tablesService.getTable(id)));

	constructor(
		private readonly _routerService: RouterService,
		private readonly _tablesService: TablesService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId, hallId }) => {
				this._breadcrumbsService.setBackUrl(
					CLIENT_ROUTES.TABLES.absolutePath.replace(PLACE_ID, placeId).replace(HALL_ID, hallId)
				);
			});

		this._actionsService.setAction({
			label: "Подтвердить",
			action: () =>
				this.table$
					.pipe(
						take(1),
						switchMap((table) =>
							this._ordersService.updateActiveOrder((order) => ({
								...order,
								table: table?.id
							}))
						)
					)
					.subscribe()
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
