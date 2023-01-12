import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewCategoryModule } from "../../../../../features/categories";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";
import { CATEGORIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, CategoriesRoutingModule, TypographyModule, I18nModule, PreviewCategoryModule],
	providers: CATEGORIES_PROVIDERS
})
export class CategoriesModule {}
