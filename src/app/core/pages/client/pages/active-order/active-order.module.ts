import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PlacesFeatureModule } from "../../../../../features/places";
import { ProductsFeatureModule } from "../../../../../features/products";
import { TablesFeatureModule } from "../../../../../features/tables";
import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../../shared/ui/button";
import { IconModule } from "../../../../../shared/ui/icon";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { ActiveOrderRoutingModule } from "./active-order-routing.module";
import { ActiveOrderComponent } from "./layout/active-order.component";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [
		CommonModule,
		ActiveOrderRoutingModule,
		TypographyModule,
		ButtonModule,
		PlacesFeatureModule,
		TablesFeatureModule,
		ProductsFeatureModule,
		IconModule,
		TranslocoModule
	]
})
export class ActiveOrderModule {}
