import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: "app-image-dialog",
	templateUrl: "./image-dialog.component.html",
	styleUrls: ["./image-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent {
	constructor(private readonly _dialogRef: DialogRef) {}

	get data() {
		return this._dialogRef.data;
	}

	closeDialog(data: any) {
		this._dialogRef.close(data);
	}
}
