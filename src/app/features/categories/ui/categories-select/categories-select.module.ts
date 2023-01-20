import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CategoriesSelectComponent } from "./layout/categories-select.component";

@NgModule({
	declarations: [CategoriesSelectComponent],
	imports: [CommonModule, FormsModule],
	exports: [CategoriesSelectComponent]
})
export class CategoriesSelectModule {}
