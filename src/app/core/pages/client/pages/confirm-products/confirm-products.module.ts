import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewProductModule } from "../../../../../features/products";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ConfirmProductsRoutingModule } from "./confirm-products-routing.module";
import { ConfirmProductsComponent } from "./layout/confirm-products.component";
import { CONFIRM_PRODUCTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ConfirmProductsComponent],
	imports: [CommonModule, ConfirmProductsRoutingModule, TypographyModule, I18nModule, PreviewProductModule],
	providers: CONFIRM_PRODUCTS_PROVIDERS
})
export class ConfirmProductsModule {}
