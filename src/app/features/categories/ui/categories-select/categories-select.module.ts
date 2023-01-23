import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ImageModule } from "@shared/ui/image";

import { SkeletonCategoriesSelectModule } from "../skeleton-categories-select";
import { CategoriesSelectComponent } from "./layout/categories-select.component";

@NgModule({
	declarations: [CategoriesSelectComponent],
	imports: [CommonModule, FormsModule, SkeletonCategoriesSelectModule, ImageModule, RouterModule],
	exports: [CategoriesSelectComponent]
})
export class CategoriesSelectModule {}
