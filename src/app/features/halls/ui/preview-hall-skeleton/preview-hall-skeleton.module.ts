import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewHallSkeletonComponent } from "./layout/preview-hall-skeleton.component";

@NgModule({
	declarations: [PreviewHallSkeletonComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [PreviewHallSkeletonComponent]
})
export class PreviewHallSkeletonModule {}
