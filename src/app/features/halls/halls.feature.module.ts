import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconModule } from "../../shared/ui/icon";
import { ImageModule } from "../../shared/ui/image";
import { HALL_COMPONENTS } from "./components";

@NgModule({
	declarations: HALL_COMPONENTS,
	imports: [CommonModule, ImageModule, IconModule],
	exports: HALL_COMPONENTS
})
export class HallsFeatureModule {}
