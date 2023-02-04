import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewProductModule } from "@features/products";
import { I18nModule } from "@shared/modules/i18n";
import { TypographyModule } from "@shared/ui/typography";

import { ProductModule } from "../product/product.module";
import { PRODUCTS_ERROR_COMPONENTS } from "./components";
import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorRoutingModule } from "./products-error-routing.module";

@NgModule({
	declarations: [ProductsErrorComponent, ...PRODUCTS_ERROR_COMPONENTS],
	imports: [CommonModule, ProductsErrorRoutingModule, TypographyModule, I18nModule, PreviewProductModule, ProductModule]
})
export class ProductsErrorModule {}
