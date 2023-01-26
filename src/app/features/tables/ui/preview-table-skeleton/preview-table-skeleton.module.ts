import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewTableSkeletonComponent } from "./layout/preview-table-skeleton.component";

@NgModule({
	declarations: [PreviewTableSkeletonComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [PreviewTableSkeletonComponent]
})
export class PreviewTableSkeletonModule {}
