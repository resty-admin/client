import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonCategoriesSelectComponent } from "./layout/skeleton-categories-select.component";

@NgModule({
	declarations: [SkeletonCategoriesSelectComponent],
	imports: [CommonModule, SkeletonModule, ImageModule],
	exports: [SkeletonCategoriesSelectComponent]
})
export class SkeletonCategoriesSelectModule {}
