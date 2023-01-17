import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import type { CategoryEntity } from "../../../../../../graphql";
import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { DeepAtLeast } from "../../../../../shared/interfaces";

@UntilDestroy()
@Component({
	selector: "app-categories-select",
	templateUrl: "./categories-select.component.html",
	styleUrls: ["./categories-select.component.scss"],
	providers: getControlValueAccessorProviders(CategoriesSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectComponent implements ControlValueAccessor, OnInit {
	@Input() categories?: DeepAtLeast<CategoryEntity, "id">[] | null;

	readonly formControl = new FormControl<string>();

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	ngOnInit() {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((categoryId) => {
			if (this.onChange) {
				this.onChange(categoryId);
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
