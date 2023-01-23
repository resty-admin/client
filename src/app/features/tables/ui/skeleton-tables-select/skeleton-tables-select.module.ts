import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";

import { PreviewTableModule } from "../preview-table";
import { SkeletonTablesSelectComponent } from "./layout/skeleton-tables-select.component";

@NgModule({
	declarations: [SkeletonTablesSelectComponent],
	imports: [CommonModule, ImageModule, PreviewTableModule, SkeletonModule],
	exports: [SkeletonTablesSelectComponent]
})
export class SkeletonTablesSelectModule {}
