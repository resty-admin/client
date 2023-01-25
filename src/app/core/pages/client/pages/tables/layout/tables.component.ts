import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TABLES_PAGE_I18N } from "@core/pages/client/pages/tables/constants";
import { TablesPageGQL, TablesPageOrderGQL } from "@core/pages/client/pages/tables/graphql";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, HALL_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { map, of, switchMap } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	readonly tablesPagei18n = TABLES_PAGE_I18N;

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
		private readonly _tablesPageOrderGQL: TablesPageOrderGQL,
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId)
		});

		const hallId = this._routerService.getParams(HALL_ID.slice(1));

		if (!hallId) {
			return;
		}

		await this._tablesPageQuery.setVariables({
			filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
		});
	}

	trackByFn(index: number) {
		return index;
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
