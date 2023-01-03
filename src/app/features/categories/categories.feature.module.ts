import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ImageModule } from "../../shared/ui/image";
import { CATEGORIES_COMPONENTS } from "./components";

@NgModule({
	declarations: CATEGORIES_COMPONENTS,
	imports: [CommonModule, ImageModule],
	exports: CATEGORIES_COMPONENTS
})
export class CategoriesFeatureModule {}
