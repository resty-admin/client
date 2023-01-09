import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import { ICounterTheme } from "../interfaces";

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
	@Output() plusClicked = new EventEmitter();
	@Output() minusClicked = new EventEmitter();
	@Input() label = "";
	@Input() count = 0;
	@Input() theme: ICounterTheme = "1";

	get className() {
		return `app-counter ${THEME.replace(ANY_SYMBOL, this.theme)} ${!this.count && "add"}`;
	}

	minus() {
		this.plusClicked.emit();
	}

	add() {
		this.minusClicked.emit();
	}
}
