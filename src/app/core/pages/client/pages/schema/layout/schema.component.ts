import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map, switchMap, tap } from "rxjs";
import { HALL_ID, ORDER_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { TableDialogComponent } from "../../../../../../features/tables/ui/table-dialog";
import { DialogService } from "../../../../../../shared/ui/dialog";
import { SCHEMA_PAGE_I18N } from "../constants";
import { SchemaPageHallsGQL, SchemaPageOrderGQL, SchemaPageTablesGQL } from "../graphql/schema-page";

@UntilDestroy()
@Component({
	selector: "app-schema",
	templateUrl: "./schema.component.html",
	styleUrls: ["./schema.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemaComponent implements OnInit, OnDestroy {
	readonly schemaPagei18n = SCHEMA_PAGE_I18N;

	readonly hallControl = new FormControl<string>();

	private readonly _schemaPageHallsQuery = this._scemaPageHallsGQL.watch();
	readonly halls$ = this._schemaPageHallsQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		tap((halls) => {
			if (!halls || !halls[0] || this.hallControl.value) {
				return;
			}

			this.hallControl.setValue(halls[0].id);
		})
	);

	private readonly _schemaPageTablesQuery = this._scemaPageTablesGQL.watch();
	private readonly _schemaPageOrderQuery = this._schemaPageOrderGQL.watch();
	readonly tables$ = this._schemaPageTablesQuery.valueChanges.pipe(
		map((result) => result.data.tables.data),
		switchMap((tables) =>
			this._schemaPageOrderQuery.valueChanges.pipe(
				map((result) => result.data.order),
				map((order) =>
					(tables || []).map((table) => ({
						...table,
						active: order.table?.id === table.id
					}))
				)
			)
		)
	);

	constructor(
		private readonly _scemaPageHallsGQL: SchemaPageHallsGQL,
		private readonly _scemaPageTablesGQL: SchemaPageTablesGQL,
		private readonly _schemaPageOrderGQL: SchemaPageOrderGQL,
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
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		this._routerService
			.selectParams(HALL_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (categoryId) => {
				this.hallControl.setValue(categoryId);
			});

		this.hallControl.valueChanges.pipe(untilDestroyed(this)).subscribe(async (hallId) => {
			if (!hallId || hallId === this._routerService.getParams(HALL_ID.slice(1))) {
				return;
			}

			await this._schemaPageTablesQuery.setVariables({
				filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
			});

			await this._routerService.navigateByUrl(
				CLIENT_ROUTES.HALL.absolutePath
					.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
					.replace(HALL_ID, hallId)
			);
		});

		this._ordersService.activeOrderId$.pipe(untilDestroyed(this)).subscribe(async (orderId) => {
			if (!orderId) {
				return;
			}

			await this._schemaPageOrderQuery.refetch({ orderId });
		});

		await this._schemaPageHallsQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	async openTableDialog(data: any) {
		const dialogResult = await lastValueFrom(this._dialogService.open(TableDialogComponent, { data }).afterClosed$);

		if (!dialogResult) {
			return;
		}

		const activeOrderId = this._ordersService.getActiveOrderId();

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
