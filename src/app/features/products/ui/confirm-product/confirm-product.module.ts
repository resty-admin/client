import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";

import { ConfrimProductComponent } from "./layout/confrim-product.component";

@NgModule({
	declarations: [ConfrimProductComponent],
	imports: [CommonModule, ImageModule, CounterModule, I18nModule],
	exports: [ConfrimProductComponent]
})
export class ConfirmProductModule {}
