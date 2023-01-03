import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { HallsFeatureModule } from "../../../../../features/halls";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";

@NgModule({
	declarations: [HallsComponent],
	imports: [CommonModule, HallsRoutingModule, TypographyModule, HallsFeatureModule]
})
export class HallsModule {}
