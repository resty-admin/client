import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PlacesFeatureModule } from "../../../../../features/places";
import { ProductsFeatureModule } from "../../../../../features/products";
import { TablesFeatureModule } from "../../../../../features/tables";
import { ButtonModule } from "../../../../../shared/ui/button";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { OrderComponent } from "./layout/order.component";
import { OrderRoutingModule } from "./order-routing.module";

@NgModule({
	declarations: [OrderComponent],
	imports: [
		CommonModule,
		OrderRoutingModule,
		TypographyModule,
		ButtonModule,
		PlacesFeatureModule,
		TablesFeatureModule,
		ProductsFeatureModule
	]
})
export class OrderModule {}
