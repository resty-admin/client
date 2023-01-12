import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewHallModule } from "../../../../../features/halls";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { HALLS_PAGE_I18N } from "./constants";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";

@NgModule({
	declarations: [HallsComponent],
	imports: [CommonModule, HallsRoutingModule, TypographyModule, I18nModule, PreviewHallModule],
	providers: [getI18nProvider(HALLS_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class HallsModule {}
