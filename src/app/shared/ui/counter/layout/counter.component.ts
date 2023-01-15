import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import type { ISimpleChanges } from "../../../interfaces";
import { ICounterTheme } from "../interfaces";

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnChanges {
	@Output() plusClicked = new EventEmitter();
	@Output() minusClicked = new EventEmitter();
	@Input() label = "";
	@Input() value? = 0;
	@Input() theme: ICounterTheme = "1";

	className = `app-counter ${THEME.replace(ANY_SYMBOL, this.theme)} ${!this.value && "add"}`;

	setClassName(theme = this.theme, value = this.value) {
		this.className = `app-counter ${THEME.replace(ANY_SYMBOL, theme)} ${!value && "add"}`;
	}

	ngOnChanges(changes: ISimpleChanges<CounterComponent>) {
		if (changes.theme) {
			this.setClassName(changes.theme.currentValue);
		}

		if (changes.value) {
			this.setClassName(undefined, changes.value.currentValue);
		}
	}

	emitPlusClick() {
		this.plusClicked.emit();
	}

	emitMinusClick() {
		this.minusClicked.emit();
	}
}
