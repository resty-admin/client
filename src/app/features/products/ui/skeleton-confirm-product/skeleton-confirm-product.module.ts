import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonConfrimProductComponent } from "./layout/skeleton-confrim-product.component";

@NgModule({
	declarations: [SkeletonConfrimProductComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [SkeletonConfrimProductComponent]
})
export class SkeletonConfirmProductModule {}
