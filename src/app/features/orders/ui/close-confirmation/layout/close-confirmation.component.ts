import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

import type { ICloseConfirmationInput } from "../interfaces";

@Component({
	selector: "app-close-confirmation",
	templateUrl: "./close-confirmation.component.html",
	styleUrls: ["./close-confirmation.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseConfirmationComponent<T extends ICloseConfirmationInput> implements OnInit {
	data!: ICloseConfirmationInput;
	constructor(private readonly _dialogRef: DialogRef<T>) {}

	ngOnInit() {
		this.data = this._dialogRef.data;
	}

	closeDialog(data?: ICloseConfirmationInput) {
		if (!data) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close(data);
	}
}
