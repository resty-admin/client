import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewPlaceModule } from "../../../../../features/places";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";
import { PLACES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [PlacesComponent],
	imports: [CommonModule, PlacesRoutingModule, TypographyModule, I18nModule, PreviewPlaceModule],
	providers: PLACES_PROVIDERS
})
export class PlacesModule {}
