import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import type { Dayjs } from "dayjs";

@Component({
	selector: "app-ios-datepicker-dialog",
	templateUrl: "./ios-datepicker-dialog.component.html",
	styleUrls: ["./ios-datepicker-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IosDatepickerDialogComponent {
	readonly formControl = new FormControl<Dayjs>(this._dialogRef.data);

	constructor(private readonly _dialogRef: DialogRef) {}

	closeDialog(date: Dayjs) {
		this._dialogRef.close(date);
	}
}
