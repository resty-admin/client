import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ChipModule } from "../../shared/ui/chip";
import { ImageModule } from "../../shared/ui/image";
import { TableComponent } from "./components/table/table.component";

@NgModule({
	imports: [CommonModule, ImageModule, ChipModule],
	exports: [TableComponent],
	declarations: [TableComponent]
})
export class TablesFeatureModule {}
