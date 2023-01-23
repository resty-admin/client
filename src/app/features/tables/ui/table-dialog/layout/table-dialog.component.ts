import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { TableEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import type { DeepPartial } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import type { Dayjs } from "dayjs";
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, take, tap } from "rxjs";

import { TABLE_DIALOG_I18N } from "../constants";
import { IsTableAvailableForReserveGQL, TableDialogGQL } from "../graphql";
import { TABLE_DIALOG_PROVIDERS } from "../providers";

@Component({
	selector: "app-table-dialog",
	templateUrl: "./table-dialog.component.html",
	styleUrls: ["./table-dialog.component.scss"],
	providers: TABLE_DIALOG_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDialogComponent implements OnInit {
	readonly tableDialogI18n = TABLE_DIALOG_I18N;

	private readonly _tableDialogQuery = this._tableDialogGQL.watch();
	readonly table$ = this._tableDialogQuery.valueChanges.pipe(map((result) => result.data.table));

	readonly dateControl = new FormControl<Dayjs>();

	validationStatus: "invalid" | "loading" | "valid" = "loading";

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _tableDialogGQL: TableDialogGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _isTableAvailableForReserveGQL: IsTableAvailableForReserveGQL,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	closeDialogWithData(table: DeepPartial<TableEntity>) {
		this._dialogRef.close(table);
	}

	async ngOnInit() {
		await this._tableDialogQuery.setVariables({ tableId: this._dialogRef.data.id });

		this.dateControl.valueChanges
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				filter((date) => Boolean(date)),
				map((date) => date.format()),
				tap(() => {
					this.validationStatus = "loading";
					this._changeDetectorRef.detectChanges();
				}),
				switchMap((date) =>
					this._isTableAvailableForReserveGQL
						.watch({ body: { date, tableId: this._dialogRef.data.id } })
						.valueChanges.pipe(
							take(1),
							map(() => true),
							catchError(() => of(false))
						)
				)
			)
			.subscribe((isValid) => {
				this.validationStatus = isValid ? "valid" : "invalid";
				this._changeDetectorRef.detectChanges();
			});
	}
}
