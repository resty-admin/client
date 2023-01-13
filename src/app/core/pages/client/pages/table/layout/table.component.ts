import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, shareReplay, switchMap, take } from "rxjs";
import { combineLatest } from "rxjs";
import { DYNAMIC_ID, HALL_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { TABLE_PAGE_I18N } from "../constants";
import { TablePageGQL } from "../graphql/table-page";

@UntilDestroy()
@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
	readonly tablePageI18n = TABLE_PAGE_I18N;

	private readonly _tablePageQuery = this._tablePageGQL.watch();
	readonly table$ = this._tablePageQuery.valueChanges.pipe(
		map((result) => result.data.table),
		shareReplay({ refCount: true })
	);

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
			.subscribe(async ({ placeId, hallId, id }) => {
				await this._tablePageQuery.setVariables({ tableId: id });
				this._breadcrumbsService.setBackUrl(
					CLIENT_ROUTES.TABLES.absolutePath.replace(PLACE_ID, placeId).replace(HALL_ID, hallId)
				);
			});

		this._actionsService.setAction({
			label: "Подтвердить",
			action: () => {
				combineLatest([this.table$, this._ordersService.activeOrderId$])
					.pipe(
						take(1),
						switchMap(([table, activeOrderId]) => this._ordersService.addTableToOrder(activeOrderId!, table.id)),
						take(1),
						map((result) => result.data?.addTableToOrder)
					)
					.subscribe(async (activeOrder) => {
						if (!activeOrder) {
							return;
						}

						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(DYNAMIC_ID, activeOrder.id)
						);
					});
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
