import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewTableModule } from "../../../../../features/tables";
import { getI18nProvider } from "../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { TABLES_PAGE_I18N } from "./constants";
import { TablesComponent } from "./layout/tables.component";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [CommonModule, TablesRoutingModule, TypographyModule, TranslocoModule, PreviewTableModule],
	providers: [getI18nProvider(TABLES_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class TablesModule {}
