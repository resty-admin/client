import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: "app-redirect-confirmation",
	templateUrl: "./redirect-confirmation.component.html",
	styleUrls: ["./redirect-confirmation.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectConfirmationComponent {
	constructor(private readonly _dialogRef: DialogRef) {}

	closeDialog(data?: boolean) {
		this._dialogRef.close(data);
	}
}
