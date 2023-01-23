import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

import { SkeletonComponent } from "./layout/skeleton.component";

@NgModule({
	declarations: [SkeletonComponent],
	imports: [CommonModule, NgxSkeletonLoaderModule],
	exports: [SkeletonComponent]
})
export class SkeletonModule {}
