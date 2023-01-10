import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PlacesFeatureModule } from "../../../../../features/places";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent],
	imports: [CommonModule, PlacesRoutingModule, TypographyModule, PlacesFeatureModule, I18nModule],
	providers: [getI18nProvider("placesPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class PlacesModule {}
