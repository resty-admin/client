import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { ActiveOrderSkeletonComponent } from "./layout/active-order-skeleton.component";

@NgModule({
	declarations: [ActiveOrderSkeletonComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [ActiveOrderSkeletonComponent]
})
export class ActiveOrderSkeletonModule {}
