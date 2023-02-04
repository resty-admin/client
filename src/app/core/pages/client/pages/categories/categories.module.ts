import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewCategoryModule, PreviewCategorySkeletonModule } from "@features/categories";
import { I18nModule } from "@shared/modules/i18n";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CATEGORIES_COMPONENTS } from "./components";
import { CategoriesComponent } from "./layout/categories.component";

@NgModule({
	declarations: [CategoriesComponent, ...CATEGORIES_COMPONENTS],
	imports: [
		CommonModule,
		CategoriesRoutingModule,
		I18nModule,
		TypographyModule,
		ImageModule,
		PreviewCategoryModule,
		PreviewCategorySkeletonModule,
		SkeletonModule
	]
})
export class CategoriesModule {}
