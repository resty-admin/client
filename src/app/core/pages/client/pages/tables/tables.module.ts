import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TablesFeatureModule } from "../../../../../features/tables";
import { TablesComponent } from "./layout/tables.component";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [CommonModule, TablesRoutingModule, TypographyModule, TablesFeatureModule],
	exports: [TablesComponent]
})
export class TablesModule {}
