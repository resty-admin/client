import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonHallsSelectComponent } from "./layout/skeleton-halls-select.component";

@NgModule({
	declarations: [SkeletonHallsSelectComponent],
	imports: [CommonModule, ImageModule, FormsModule, SkeletonModule],
	exports: [SkeletonHallsSelectComponent]
})
export class SkeletonHallsSelectModule {}
