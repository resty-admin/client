import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewProductModule } from "../../../../../features/products";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { PRODUCTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsComponent],
	imports: [CommonModule, ProductsRoutingModule, TypographyModule, I18nModule, PreviewProductModule],
	providers: PRODUCTS_PROVIDERS
})
export class ProductsModule {}
