import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, CategoriesRoutingModule, TypographyModule, ImageModule]
})
export class CategoriesModule {}
