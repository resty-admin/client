import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { ChipModule } from "src/app/shared/ui/chip";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { IosDatepickerModule } from "../../../../../shared/ui/ios-datepicker";
import { TableComponent } from "./layout/table.component";
import { TableRoutingModule } from "./table-routing.module";

@NgModule({
	declarations: [TableComponent],
	imports: [
		CommonModule,
		TableRoutingModule,
		ImageModule,
		IconModule,
		TypographyModule,
		ChipModule,
		IosDatepickerModule,
		ButtonModule
	]
})
export class TableModule {}
