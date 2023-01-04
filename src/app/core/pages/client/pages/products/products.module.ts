import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductsFeatureModule } from "../../../../../features/products";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent],
	imports: [CommonModule, ProductsRoutingModule, TypographyModule, ProductsFeatureModule, I18nModule]
})
export class ProductsModule {}
