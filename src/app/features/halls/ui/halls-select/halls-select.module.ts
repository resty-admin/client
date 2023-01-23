import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImageModule } from "@shared/ui/image";

import { SkeletonHallsSelectModule } from "../skeleton-halls-select/skeleton-halls-select.module";
import { HallsSelectComponent } from "./layout/halls-select.component";

@NgModule({
	declarations: [HallsSelectComponent],
	imports: [CommonModule, ImageModule, RouterModule, SkeletonHallsSelectModule],
	exports: [HallsSelectComponent]
})
export class HallsSelectModule {}
