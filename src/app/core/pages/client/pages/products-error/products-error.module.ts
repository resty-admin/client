import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductsFeatureModule } from "../../../../../features/products";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorRoutingModule } from "./products-error-routing.module";

@NgModule({
	declarations: [ProductsErrorComponent],
	imports: [CommonModule, ProductsErrorRoutingModule, TypographyModule, ProductsFeatureModule, I18nModule]
})
export class ProductsErrorModule {}
