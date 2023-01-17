import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import type { HallEntity } from "../../../../../../graphql";
import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { DeepAtLeast } from "../../../../../shared/interfaces";

@UntilDestroy()
@Component({
	selector: "app-halls-select",
	templateUrl: "./halls-select.component.html",
	styleUrls: ["./halls-select.component.scss"],
	providers: getControlValueAccessorProviders(HallsSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSelectComponent implements ControlValueAccessor, OnInit {
	@Input() halls?: DeepAtLeast<HallEntity, "id">[] | null;

	readonly formControl = new FormControl<string>();

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	ngOnInit() {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((hallId) => {
			if (this.onChange) {
				this.onChange(hallId);
			}
		});
	}

	registerOnChange(onChange: (value: string) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.formControl.errors;
	}

	writeValue(value: any): void {
		this.formControl.setValue(value, { emitValue: false });
	}

	trackByFn(index: number) {
		return index;
	}
}
