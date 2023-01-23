import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonProductModule } from "../skeleton-product";
import { SkeletonProductToOrderModule } from "../skeleton-product-to-order";
import { SkeletonProductsToOrderSelectComponent } from "./layout/skeleton-products-to-order-select.component";

@NgModule({
	declarations: [SkeletonProductsToOrderSelectComponent],
	imports: [CommonModule, SkeletonModule, SkeletonProductModule, SkeletonProductToOrderModule],
	exports: [SkeletonProductsToOrderSelectComponent]
})
export class SkeletonProductsToOrderSelectModule {}
