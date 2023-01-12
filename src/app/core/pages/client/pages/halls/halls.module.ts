import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewHallModule } from "../../../../../features/halls";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";
import { HALLS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HallsComponent],
	imports: [CommonModule, HallsRoutingModule, TypographyModule, I18nModule, PreviewHallModule],
	providers: HALLS_PROVIDERS
})
export class HallsModule {}
