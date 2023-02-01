import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";

import { PreviewProductComponent } from "./layout/preview-product.component";

@NgModule({
	declarations: [PreviewProductComponent],
	imports: [CommonModule, ImageModule, CounterModule, I18nModule],
	exports: [PreviewProductComponent]
})
export class PreviewProductModule {}
