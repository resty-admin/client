import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewHallModule } from "@features/halls";
import { I18nModule } from "@shared/modules/i18n";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";
import { HALLS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HallsComponent],
	imports: [CommonModule, HallsRoutingModule, TypographyModule, I18nModule, ImageModule, PreviewHallModule],
	providers: HALLS_PROVIDERS
})
export class HallsModule {}
