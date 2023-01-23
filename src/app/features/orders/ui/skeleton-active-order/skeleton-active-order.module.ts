import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonConfirmProductModule, SkeletonProductModule } from "@features/products";
import { SkeletonProductsToOrderSelectModule } from "@features/products/ui/skeleton-products-to-order-select";
import { SkeletonUsersSelectModule } from "@features/users";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonOrderInfoModule } from "../skeleton-order-info";
import { SkeletonActiveOrderComponent } from "./layout/skeleton-active-order.component";

@NgModule({
	declarations: [SkeletonActiveOrderComponent],
	imports: [
		CommonModule,
		SkeletonModule,
		SkeletonUsersSelectModule,
		SkeletonProductModule,
		SkeletonConfirmProductModule,
		SkeletonProductsToOrderSelectModule,
		SkeletonOrderInfoModule
	],
	exports: [SkeletonActiveOrderComponent]
})
export class SkeletonActiveOrderModule {}
