import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductsFeatureModule } from "../../../../../features/products";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent],
	imports: [CommonModule, ProductsRoutingModule, TypographyModule, ProductsFeatureModule]
})
export class ProductsModule {}
