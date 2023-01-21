import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PreviewCategoryModule } from "@features/categories";
import { HallsSelectModule } from "@features/halls";
import { PreviewProductModule } from "@features/products";
import { PreviewTableModule } from "@features/tables";
import { TablesSelectModule } from "@features/tables/ui/tables-select";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { ImageModule } from "@shared/ui/image";
import { IosDatepickerModule } from "@shared/ui/ios-datepicker";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { SchemaComponent } from "./layout/schema.component";
import { SCHEMA_PROVIDERS } from "./providers";
import { SchemaRoutingModule } from "./schema-routing.module";

@NgModule({
	declarations: [SchemaComponent],
	imports: [
		CommonModule,
		SchemaRoutingModule,
		TypographyModule,
		I18nModule,
		RadioButtonModule,
		TextareaModule,
		ImageModule,
		PreviewCategoryModule,
		ReactiveFormsModule,
		PreviewProductModule,
		ButtonModule,
		PreviewTableModule,
		IosDatepickerModule,
		TablesSelectModule,
		HallsSelectModule
	],
	providers: SCHEMA_PROVIDERS
})
export class SchemaModule {}
