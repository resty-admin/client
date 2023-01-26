import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewProductSkeletonComponent } from "./layout/preview-product-skeleton.component";

@NgModule({
	declarations: [PreviewProductSkeletonComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [PreviewProductSkeletonComponent]
})
export class PreviewProductSkeletonModule {}
