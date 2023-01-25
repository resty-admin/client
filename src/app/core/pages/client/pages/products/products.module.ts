import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PreviewCategoryModule } from "@features/categories";
import { ProductModule } from "@features/products";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { ImageModule } from "@shared/ui/image";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { PRODUCTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsComponent],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		TypographyModule,
		I18nModule,
		RadioButtonModule,
		TextareaModule,
		ImageModule,
		PreviewCategoryModule,
		ReactiveFormsModule,
		ProductModule,
		ButtonModule
	],
	providers: PRODUCTS_PROVIDERS
})
export class ProductsModule {}
