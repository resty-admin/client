import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfirmProductModule } from "@features/products";
import { ConfirmProductSkeletonModule } from "@features/products/ui/confirm-product-skeleton";
import { I18nModule } from "@shared/modules/i18n";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { CONFIRM_PRODUCTS_COMPONENTS } from "./components";
import { ConfirmProductsRoutingModule } from "./confirm-products-routing.module";
import { ConfirmProductsComponent } from "./layout/confirm-products.component";
import { CONFIRM_PRODUCTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ConfirmProductsComponent, ...CONFIRM_PRODUCTS_COMPONENTS],
	imports: [
		CommonModule,
		ConfirmProductsRoutingModule,
		TypographyModule,
		I18nModule,
		ConfirmProductModule,
		SkeletonModule,
		ConfirmProductSkeletonModule
	],
	providers: CONFIRM_PRODUCTS_PROVIDERS
})
export class ConfirmProductsModule {}
