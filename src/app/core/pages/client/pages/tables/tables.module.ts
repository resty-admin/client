import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChipModule } from "src/app/shared/ui/chip";
import { DatepickerModule } from "src/app/shared/ui/datepicker";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TablesComponent } from "./layout/tables.component";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [CommonModule, TablesRoutingModule, TypographyModule, DatepickerModule, ImageModule, ChipModule],
	exports: [TablesComponent]
})
export class TablesModule {}
