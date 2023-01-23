import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonCategoriesSelectComponent } from "./layout/skeleton-categories-select.component";

@NgModule({
	declarations: [SkeletonCategoriesSelectComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [SkeletonCategoriesSelectComponent]
})
export class SkeletonCategoriesSelectModule {}
