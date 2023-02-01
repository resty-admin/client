import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewPlaceModule, PreviewPlaceSkeletonModule } from "@features/places";
import { I18nModule } from "@shared/modules/i18n";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { PLACES_COMPONENTS } from "./components";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent, ...PLACES_COMPONENTS],
	imports: [
		CommonModule,
		PlacesRoutingModule,
		TypographyModule,
		I18nModule,
		SkeletonModule,
		PreviewPlaceModule,
		PreviewPlaceSkeletonModule
	]
})
export class PlacesModule {}
