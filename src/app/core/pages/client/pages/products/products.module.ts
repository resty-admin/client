import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewProductModule } from "../../../../../features/products";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { PRODUCTS_PAGE_I18N } from "./constants";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent],
	imports: [CommonModule, ProductsRoutingModule, TypographyModule, I18nModule, PreviewProductModule],
	providers: [getI18nProvider(PRODUCTS_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class ProductsModule {}
