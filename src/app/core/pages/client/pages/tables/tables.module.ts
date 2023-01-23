import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TablesSelectModule } from "@features/tables";
import { I18nModule } from "@shared/modules/i18n";
import { TypographyModule } from "@shared/ui/typography";

import { TablesComponent } from "./layout/tables.component";
import { TABLES_PROVIDERS } from "./providers";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [CommonModule, TablesRoutingModule, I18nModule, TypographyModule, TablesSelectModule],
	providers: TABLES_PROVIDERS
})
export class TablesModule {}
