import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent],
	imports: [CommonModule, PlacesRoutingModule, TypographyModule, IconModule, ImageModule],
	exports: [PlacesComponent]
})
export class PlacesModule {}
