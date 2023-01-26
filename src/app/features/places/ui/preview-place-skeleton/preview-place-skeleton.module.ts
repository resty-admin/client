import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewPlaceSkeletonComponent } from "./layout/preview-place-skeleton.component";

@NgModule({
	declarations: [PreviewPlaceSkeletonComponent],
	imports: [CommonModule, ImageModule, SkeletonModule, IconModule],
	exports: [PreviewPlaceSkeletonComponent]
})
export class PreviewPlaceSkeletonModule {}
