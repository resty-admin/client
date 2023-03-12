import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IsTimeAvailableGQL } from "@shared/ui/ios-datepicker-dialog/graphql/is-available";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap } from "rxjs";

import { IsTableAvailableForReserveGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-ios-datepicker-dialog",
	templateUrl: "./ios-datepicker-dialog.component.html",
	styleUrls: ["./ios-datepicker-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IosDatepickerDialogComponent implements OnInit {
	readonly formControl = new FormControl<Dayjs>();

	validationStatus: "INVALID" | "LOADING" | "VALID" = "LOADING";

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _isTimeAvailableGQL: IsTimeAvailableGQL,
		private readonly _isTableAvailableForReserveGQL: IsTableAvailableForReserveGQL,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		const order = this._dialogRef.data;

		if (!order) {
			return;
		}

		this.formControl.setValue(dayjs(order.startDate));

		this.formControl.valueChanges
			.pipe(
				untilDestroyed(this),
				tap(() => {
					this.validationStatus = "LOADING";
					this._changeDetectorRef.detectChanges();
				}),
				filter((date) => Boolean(date)),
				debounceTime(500),
				distinctUntilChanged(),
				map((date) => date.utcOffset(0).format()),
				switchMap((date) =>
					order.table
						? this._isTableAvailableForReserveGQL
								.fetch({ date, tableId: order.table.id })
								.pipe(catchError(() => of(null)))
						: this._isTimeAvailableGQL.fetch({ date, placeId: order.place.id }).pipe(catchError(() => of(null)))
				)
			)
			.subscribe((result) => {
				this.validationStatus = result ? "VALID" : "INVALID";
				this._changeDetectorRef.detectChanges();
			});
	}

	closeDialog(date: Dayjs) {
		this._dialogRef.close(date);
	}
}
