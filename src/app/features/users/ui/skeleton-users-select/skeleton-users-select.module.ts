import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from "@shared/ui/skeleton";

import { SkeletonUsersSelectComponent } from "./layout/skeleton-users-select.component";

@NgModule({
	declarations: [SkeletonUsersSelectComponent],
	imports: [CommonModule, SkeletonModule],
	exports: [SkeletonUsersSelectComponent]
})
export class SkeletonUsersSelectModule {}
