import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewProductModule } from "../../../../../features/products";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorRoutingModule } from "./products-error-routing.module";
import { PRODUCTS_ERORR_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsErrorComponent],
	imports: [CommonModule, ProductsErrorRoutingModule, TypographyModule, I18nModule, PreviewProductModule],
	providers: PRODUCTS_ERORR_PROVIDERS
})
export class ProductsErrorModule {}
