import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DirectivesModule } from "../../shared/modules/directives";
import { CounterModule } from "../../shared/ui/counter";
import { IconModule } from "../../shared/ui/icon";
import { ImageModule } from "../../shared/ui/image";
import { PRODUCT_COMPONENTS } from "./components";

@NgModule({
	declarations: PRODUCT_COMPONENTS,
	imports: [CommonModule, ImageModule, CounterModule, DirectivesModule, ReactiveFormsModule, IconModule],
	exports: PRODUCT_COMPONENTS
})
export class ProductsFeatureModule {}
