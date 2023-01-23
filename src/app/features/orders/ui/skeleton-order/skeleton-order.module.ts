import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonOrderComponent } from "./layout/skeleton-order.component";

@NgModule({
	declarations: [SkeletonOrderComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [SkeletonOrderComponent]
})
export class SkeletonOrderModule {}
