import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewHallModule, PreviewHallSkeletonModule } from "@features/halls";
import { I18nModule } from "@shared/modules/i18n";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { HALLS_COMPONENTS } from "./components";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";
import { HALLS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HallsComponent, ...HALLS_COMPONENTS],
	imports: [
		CommonModule,
		HallsRoutingModule,
		TypographyModule,
		I18nModule,
		ImageModule,
		SkeletonModule,
		PreviewHallModule,
		PreviewHallSkeletonModule
	],
	providers: HALLS_PROVIDERS
})
export class HallsModule {}
