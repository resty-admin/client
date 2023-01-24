import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

import { ALREADY_EXIST_I18N } from "../constants";
import type { IAlreadyExistInput } from "../interfaces";

@Component({
	selector: "app-already-exist",
	templateUrl: "./already-exist.component.html",
	styleUrls: ["./already-exist.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlreadyExistComponent<T extends IAlreadyExistInput> implements OnInit {
	readonly alreadyExistI18n = ALREADY_EXIST_I18N;
	data!: IAlreadyExistInput;
	constructor(private readonly _dialogRef: DialogRef<T>) {}

	ngOnInit() {
		this.data = this._dialogRef.data;
	}

	closeDialog(data: "cancel" | "navigate") {
		this._dialogRef.close(data);
	}
}
