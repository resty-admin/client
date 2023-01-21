import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";

import { PreviewTableModule } from "../preview-table";
import { TablesSelectComponent } from "./layout/tables-select.component";

@NgModule({
	declarations: [TablesSelectComponent],
	imports: [CommonModule, ImageModule, PreviewTableModule],
	exports: [TablesSelectComponent]
})
export class TablesSelectModule {}
