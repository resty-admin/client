import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { TableDialogComponent } from "@features/tables/ui/table-dialog";
import type { TableEntity } from "@graphql";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, HALL_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { filter, lastValueFrom, map, ReplaySubject, shareReplay, switchMap, take, tap } from "rxjs";

import { SCHEMA_PAGE_I18N } from "../constants";
import { SchemaPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-schema",
	templateUrl: "./schema.component.html",
	styleUrls: ["./schema.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemaComponent implements OnInit, OnDestroy {
	readonly schemaPagei18n = SCHEMA_PAGE_I18N;
	private readonly _schemaPageQuery = this._schemaPageGQL.watch();
	private readonly _selectedHallSubject = new ReplaySubject<string>();
	readonly selectedHall$ = this._selectedHallSubject.asObservable();
	readonly halls$ = this._schemaPageQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		tap(async (halls) => {
			const { hallId, placeId } = this._routerService.getParams();

			if (!halls || !halls[0] || hallId) {
				return;
			}

			await this._routerService.navigateByUrl(
				CLIENT_ROUTES.HALL.absolutePath.replace(PLACE_ID, placeId).replace(HALL_ID, halls[0].id)
			);
		}),
		shareReplay({ refCount: true })
	);

	readonly tables$ = this.halls$.pipe(
		switchMap((halls) =>
			this._ordersService.tableId$.pipe(
				switchMap((tableId) =>
					this.selectedHall$.pipe(
						map((hallId) => (halls || []).find((hall) => hall.id === hallId)?.tables || []),
						map((tables) => tables.map((table) => ({ ...table, active: table.id === tableId })))
					)
				)
			)
		)
	);

	constructor(
		private readonly _schemaPageGQL: SchemaPageGQL,
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

		this._routerService
			.selectParams(HALL_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (hallId) => {
				if (!hallId) {
					return;
				}

				this._selectedHallSubject.next(hallId);
			});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		const orderId = await lastValueFrom(
			this._ordersService.activeOrderId$.pipe(
				filter((orderId) => Boolean(orderId)),
				take(1)
			)
		);

		if (!orderId) {
			return;
		}

		await this._schemaPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
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

	async setSelectedHall(hallId: string) {
		await this._routerService.navigateByUrl(
			CLIENT_ROUTES.HALL.absolutePath
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
				.replace(HALL_ID, hallId)
		);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
