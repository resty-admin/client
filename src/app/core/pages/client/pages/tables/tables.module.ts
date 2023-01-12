import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewTableModule } from "../../../../../features/tables";
import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { TablesComponent } from "./layout/tables.component";
import { TABLES_PROVIDERS } from "./providers";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [CommonModule, TablesRoutingModule, TypographyModule, TranslocoModule, PreviewTableModule],
	providers: TABLES_PROVIDERS
})
export class TablesModule {}
