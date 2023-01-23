import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TABLES_PAGE_I18N } from "@core/pages/client/pages/tables/constants";
import { TablesPageGQL } from "@core/pages/client/pages/tables/graphql";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { TableDialogComponent } from "@features/tables/ui/table-dialog";
import type { TableEntity } from "@graphql";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, HALL_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { lastValueFrom, map, switchMap, take } from "rxjs";

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
			this._ordersService.tableId$.pipe(
				map((tableId) => (tables || []).map((table) => ({ ...table, active: table.id === tableId })))
			)
		)
	);

	constructor(
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

	async openTableDialog(data: DeepPartial<TableEntity>) {
		const dialogResult = await lastValueFrom(this._dialogService.open(TableDialogComponent, { data }).afterClosed$);

		if (!dialogResult) {
			return;
		}

		this._ordersService.setTableId(dialogResult.id);

		const activeOrderId =
			(await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)))) ||
			(await lastValueFrom(
				this._ordersService
					.createOrder({
						place: this._routerService.getParams(PLACE_ID.slice(1)),
						type: OrderTypeEnum.Reserve
					})
					.pipe(map((result) => result.data?.createOrder.id))
			));

		if (!activeOrderId) {
			return;
		}

		const tableResult = await lastValueFrom(this._ordersService.addTableToOrder(activeOrderId, dialogResult.id));

		if (!tableResult.data) {
			return;
		}

		const { id } = tableResult.data.addTableToOrder;

		await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, id));
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
