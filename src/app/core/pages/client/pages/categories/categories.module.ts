import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewCategoryModule } from "@features/categories";
import { I18nModule } from "@shared/modules/i18n";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";
import { CATEGORIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, CategoriesRoutingModule, I18nModule, TypographyModule, ImageModule, PreviewCategoryModule],
	providers: CATEGORIES_PROVIDERS
})
export class CategoriesModule {}
