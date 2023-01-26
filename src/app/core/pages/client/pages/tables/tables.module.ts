import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewTableModule } from "@features/tables";
import { PreviewTableSkeletonModule } from "@features/tables/ui";
import { I18nModule } from "@shared/modules/i18n";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { TABLES_COMPONENTS } from "./components";
import { TablesComponent } from "./layout/tables.component";
import { TABLES_PROVIDERS } from "./providers";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent, ...TABLES_COMPONENTS],
	imports: [
		CommonModule,
		TablesRoutingModule,
		I18nModule,
		TypographyModule,
		PreviewTableModule,
		PreviewTableSkeletonModule,
		SkeletonModule
	],
	providers: TABLES_PROVIDERS
})
export class TablesModule {}
