import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PreviewCategoryModule } from "@features/categories";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TextareaModule } from "@shared/ui/textarea";
import { TypographyModule } from "@shared/ui/typography";

import { PRODUCT_COMPONENTS } from "./components";
import { ProductComponent } from "./layout/product.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
	declarations: [ProductComponent, ...PRODUCT_COMPONENTS],
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
		CounterModule,
		SkeletonModule
	],
	exports: [ProductComponent]
})
export class ProductModule {}
