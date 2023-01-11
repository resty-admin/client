import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { HALL_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { TablePageGQL } from "../graphql/table-page";

@UntilDestroy()
@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
	private readonly _tablePageQuery = this._tablePageGQL.watch();
	readonly table$ = this._tablePageQuery.valueChanges.pipe(map((result) => result.data.table));

	constructor(
		private readonly _tablePageGQL: TablePageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(async ({ placeId, hallId, dynamicId }) => {
				await this._tablePageQuery.setVariables({ tableId: dynamicId });

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
						switchMap((table) => this._ordersService.updateActiveOrder({ table: table.id }))
					)
					.subscribe()
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
