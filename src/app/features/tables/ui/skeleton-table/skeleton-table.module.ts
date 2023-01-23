import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonTableComponent } from "./layout/skeleton-table.component";

@NgModule({
	declarations: [SkeletonTableComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [SkeletonTableComponent]
})
export class SkeletonTableModule {}
