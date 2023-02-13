import { Clipboard } from "@angular/cdk/clipboard";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { ToastrService } from "@shared/ui/toastr";

@Component({
	selector: "app-demo",
	templateUrl: "./demo.component.html",
	styleUrls: ["./demo.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {
	readonly cardNumber = "4444 5555 6666 1111";
	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _toastrService: ToastrService,
		private readonly _clipboard: Clipboard
	) {}

	closeDialog(data?: boolean) {
		this._dialogRef.close(data);
	}

	copy(data: any) {
		this._clipboard.copy(data.toString());

		this._toastrService.success(undefined, { data: { title: "Скопійовано" } });
	}
}
