import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PlacesFeatureModule } from "../../../../../features/places";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent],
	imports: [CommonModule, PlacesRoutingModule, TypographyModule, PlacesFeatureModule]
})
export class PlacesModule {}
