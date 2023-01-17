import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CategoriesSelectModule, PreviewCategoryModule } from "../../../../../features/categories";
import { PreviewProductModule } from "../../../../../features/products";
import { ProductsSelectModule } from "../../../../../features/products/ui/products-select";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../../shared/ui/button";
import { ImageModule } from "../../../../../shared/ui/image";
import { RadioButtonModule } from "../../../../../shared/ui/radio-button";
import { TextareaModule } from "../../../../../shared/ui/textarea";
import { MenuComponent } from "./layout/menu.component";
import { MenuRoutingModule } from "./menu-routing.module";
import { CATEGORIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [MenuComponent],
	imports: [
		CommonModule,
		MenuRoutingModule,
		TypographyModule,
		I18nModule,
		RadioButtonModule,
		TextareaModule,
		ImageModule,
		PreviewCategoryModule,
		ReactiveFormsModule,
		PreviewProductModule,
		ButtonModule,
		CategoriesSelectModule,
		ProductsSelectModule
	],
	providers: CATEGORIES_PROVIDERS
})
export class MenuModule {}
