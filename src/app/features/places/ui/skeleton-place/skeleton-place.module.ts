import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonPlaceComponent } from "./layout/skeleton-place.component";

@NgModule({
	declarations: [SkeletonPlaceComponent],
	imports: [CommonModule, ImageModule, IconModule, SkeletonModule],
	exports: [SkeletonPlaceComponent]
})
export class SkeletonPlaceModule {}
