import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PreviewCategoryModule } from "@features/categories";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { ProductComponent } from "./layout/product.component";
import { ProductRoutingModule } from "./product-routing.module";
import { PRODUCT_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductComponent],
	imports: [
		CommonModule,
		ProductRoutingModule,
		TypographyModule,
		I18nModule,
		RadioButtonModule,
		TextareaModule,
		ImageModule,
		PreviewCategoryModule,
		ReactiveFormsModule,
		ButtonModule,
		CounterModule
	],
	providers: PRODUCT_PROVIDERS
})
export class ProductModule {}
