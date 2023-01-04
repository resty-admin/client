import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CategoriesFeatureModule } from "../../../../../features/categories";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, CategoriesRoutingModule, TypographyModule, CategoriesFeatureModule, I18nModule]
})
export class CategoriesModule {}
