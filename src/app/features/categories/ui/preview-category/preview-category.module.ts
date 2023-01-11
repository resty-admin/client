import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ImageModule } from "../../../../shared/ui/image";
import { PreviewCategoryComponent } from "./layout/preview-category.component";

@NgModule({
	declarations: [PreviewCategoryComponent],
	imports: [CommonModule, ImageModule],
	exports: [PreviewCategoryComponent]
})
export class PreviewCategoryModule {}
