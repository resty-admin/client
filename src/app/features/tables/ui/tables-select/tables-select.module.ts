import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewTableModule } from "../preview-table";
import { SkeletonTableModule } from "../skeleton-table";
import { TablesSelectComponent } from "./layout/tables-select.component";

@NgModule({
	declarations: [TablesSelectComponent],
	imports: [CommonModule, ImageModule, PreviewTableModule, SkeletonModule, SkeletonTableModule],
	exports: [TablesSelectComponent]
})
export class TablesSelectModule {}
