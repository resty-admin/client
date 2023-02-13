import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: "app-waiting-for-confirm",
	templateUrl: "./waiting-for-confirm.component.html",
	styleUrls: ["./waiting-for-confirm.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingForConfirmComponent {
	constructor(private readonly _dialogRef: DialogRef) {}

	closeDialog(data?: boolean) {
		this._dialogRef.close(data);
	}
}
