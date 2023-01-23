import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonProductComponent } from "./layout/skeleton-product.component";

@NgModule({
	declarations: [SkeletonProductComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [SkeletonProductComponent]
})
export class SkeletonProductModule {}
