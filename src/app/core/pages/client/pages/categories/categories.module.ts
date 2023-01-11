import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PreviewCategoryModule } from "../../../../../features/categories";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, CategoriesRoutingModule, TypographyModule, I18nModule, PreviewCategoryModule],
	providers: [getI18nProvider("categoriesPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class CategoriesModule {}
