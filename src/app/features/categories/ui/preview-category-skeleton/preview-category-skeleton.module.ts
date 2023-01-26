import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewCategorySkeletonComponent } from "./layout/preview-category-skeleton.component";

@NgModule({
	declarations: [PreviewCategorySkeletonComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [PreviewCategorySkeletonComponent]
})
export class PreviewCategorySkeletonModule {}
