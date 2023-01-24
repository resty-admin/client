import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonProductDialogComponent } from "./layout/skeleton-product-dialog.component";

@NgModule({
	declarations: [SkeletonProductDialogComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [SkeletonProductDialogComponent]
})
export class SkeletonProductDialogModule {}
