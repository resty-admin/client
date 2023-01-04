import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IUser } from "src/app/shared/interfaces";

import { PAGES } from "../../data";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	@Output() closeClicked = new EventEmitter();

	@Input() user?: IUser | null = null;

	readonly pages = PAGES;

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
