import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

import { CANCEL_CONFIRMATION_I18N } from "../constants";
import type { ICancelConfirmationInput } from "../interfaces";

@Component({
	selector: "app-cancel-confirmation",
	templateUrl: "./cancel-confirmation.component.html",
	styleUrls: ["./cancel-confirmation.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelConfirmationComponent<T extends ICancelConfirmationInput> implements OnInit {
	readonly cancelConfirmationI18n = CANCEL_CONFIRMATION_I18N;
	data!: ICancelConfirmationInput;
	constructor(private readonly _dialogRef: DialogRef<T>) {}

	ngOnInit() {
		this.data = this._dialogRef.data;
	}

	closeDialog(data?: ICancelConfirmationInput) {
		if (!data) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close(data);
	}
}
