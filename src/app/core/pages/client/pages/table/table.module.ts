import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { ChipModule } from "src/app/shared/ui/chip";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { IosDatepickerModule } from "../../../../../shared/ui/ios-datepicker";
import { TableComponent } from "./layout/table.component";
import { TABLE_PROVIDERS } from "./providers";
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
		ButtonModule,
		I18nModule
	],
	providers: TABLE_PROVIDERS
})
export class TableModule {}
