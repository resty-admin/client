import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewOrderSkeletonComponent } from "./layout/preview-order-skeleton.component";

@NgModule({
	declarations: [PreviewOrderSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [PreviewOrderSkeletonComponent]
})
export class PreviewOrderSkeletonModule {}
