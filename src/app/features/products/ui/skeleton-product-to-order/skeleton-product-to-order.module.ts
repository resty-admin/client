import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonProductToOrderComponent } from "./layout/skeleton-product-to-order.component";

@NgModule({
	declarations: [SkeletonProductToOrderComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [SkeletonProductToOrderComponent]
})
export class SkeletonProductToOrderModule {}
