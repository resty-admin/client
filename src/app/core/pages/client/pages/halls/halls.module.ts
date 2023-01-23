import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HallsSelectModule } from "@features/halls";
import { I18nModule } from "@shared/modules/i18n";
import { TypographyModule } from "@shared/ui/typography";

import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";
import { HALLS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HallsComponent],
	imports: [CommonModule, HallsRoutingModule, TypographyModule, HallsSelectModule, I18nModule],
	providers: HALLS_PROVIDERS
})
export class HallsModule {}
