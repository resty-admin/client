import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewProductModule } from "../../../../../features/products";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { PRODUCTS_ERROR_PAGE_I18N } from "./constants";
import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorRoutingModule } from "./products-error-routing.module";

@NgModule({
	declarations: [ProductsErrorComponent],
	imports: [CommonModule, ProductsErrorRoutingModule, TypographyModule, I18nModule, PreviewProductModule],
	providers: [getI18nProvider(PRODUCTS_ERROR_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class ProductsErrorModule {}
