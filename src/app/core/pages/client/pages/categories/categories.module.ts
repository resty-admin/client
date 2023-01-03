import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CategoriesFeatureModule } from "../../../../../features/categories";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, CategoriesRoutingModule, TypographyModule, CategoriesFeatureModule]
})
export class CategoriesModule {}
