import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { IosDatepickerModule } from "@shared/ui/ios-datepicker";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { TABLE_COMPONENTS } from "./components";
import { TableComponent } from "./layout/table.component";
import { TABLE_PROVIDERS } from "./providers";
import { TableRoutingModule } from "./table-routing.module";

@NgModule({
	declarations: [TableComponent, ...TABLE_COMPONENTS],
	imports: [
		CommonModule,
		TableRoutingModule,
		I18nModule,
		TypographyModule,
		ImageModule,
		IosDatepickerModule,
		ReactiveFormsModule,
		InputModule,
		DirectivesModule,
		ButtonModule,
		SkeletonModule
	],
	providers: TABLE_PROVIDERS
})
export class TableModule {}
