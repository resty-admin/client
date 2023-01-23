import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonOrderInfoComponent } from "./layout/skeleton-order-info.component";

@NgModule({
	declarations: [SkeletonOrderInfoComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [SkeletonOrderInfoComponent]
})
export class SkeletonOrderInfoModule {}
