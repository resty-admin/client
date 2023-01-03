import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconModule } from "../../shared/ui/icon";
import { ImageModule } from "../../shared/ui/image";
import { PLACE_COMPONENTS } from "./components";

@NgModule({
	imports: [CommonModule, ImageModule, IconModule],
	declarations: PLACE_COMPONENTS,
	exports: PLACE_COMPONENTS
})
export class PlacesFeatureModule {}
