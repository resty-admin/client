import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewCategoryModule } from "../../../../../features/categories";
import { PreviewProductModule } from "../../../../../features/products";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { MENU_COMPONENTS } from "./compnents";
import { MenuComponent } from "./layout/menu.component";
import { MenuRoutingModule } from "./menu-routing.module";
import { CATEGORIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [MenuComponent, ...MENU_COMPONENTS],
	imports: [
		CommonModule,
		MenuRoutingModule,
		TypographyModule,
		I18nModule,
		PreviewCategoryModule,
		ReactiveFormsModule,
		PreviewProductModule
	],
	providers: CATEGORIES_PROVIDERS
})
export class MenuModule {}
