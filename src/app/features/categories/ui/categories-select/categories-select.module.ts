import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CategoriesSelectComponent } from "./layout/categories-select.component";

@NgModule({
	declarations: [CategoriesSelectComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [CategoriesSelectComponent]
})
export class CategoriesSelectModule {}
