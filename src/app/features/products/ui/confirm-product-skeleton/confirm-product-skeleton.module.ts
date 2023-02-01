import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { ConfirmProductSkeletonComponent } from "./layout/confirm-product-skeleton.component";

@NgModule({
	declarations: [ConfirmProductSkeletonComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [ConfirmProductSkeletonComponent]
})
export class ConfirmProductSkeletonModule {}
