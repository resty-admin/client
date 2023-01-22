import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductModule } from "@features/products";
import { I18nModule } from "@shared/modules/i18n";
import { TypographyModule } from "@shared/ui/typography";

import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorRoutingModule } from "./products-error-routing.module";
import { PRODUCTS_ERORR_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsErrorComponent],
	imports: [CommonModule, ProductsErrorRoutingModule, TypographyModule, I18nModule, ProductModule],
	providers: PRODUCTS_ERORR_PROVIDERS
})
export class ProductsErrorModule {}
