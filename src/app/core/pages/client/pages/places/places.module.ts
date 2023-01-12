import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewPlaceModule } from "../../../../../features/places";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { PLACES_PAGE_I18N } from "./constants";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent],
	imports: [CommonModule, PlacesRoutingModule, TypographyModule, I18nModule, PreviewPlaceModule],
	providers: [getI18nProvider(PLACES_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class PlacesModule {}
