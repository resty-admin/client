import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { ICategoryToSelect } from "../interfaces";

@Component({
	selector: "app-categories-select",
	templateUrl: "./categories-select.component.html",
	styleUrls: ["./categories-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectComponent {
	@Output() selectedCategoryChange = new EventEmitter<string>();
	@Input() categories?: ICategoryToSelect[] | null;
	@Input() selectedCategory?: string | null;

	trackByFn(index: number) {
		return index;
	}

	emitSelectedCategoryChange(categoryId: string) {
		this.selectedCategoryChange.emit(categoryId);
	}
}
