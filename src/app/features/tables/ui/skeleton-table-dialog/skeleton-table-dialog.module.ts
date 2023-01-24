import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonTableDialogComponent } from "./layout/skeleton-table-dialog.component";

@NgModule({
	declarations: [SkeletonTableDialogComponent],
	imports: [CommonModule, ImageModule, SkeletonModule],
	exports: [SkeletonTableDialogComponent]
})
export class SkeletonTableDialogModule {}
