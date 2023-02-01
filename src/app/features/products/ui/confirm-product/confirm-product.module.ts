import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslocoModule } from "@shared/modules/i18n";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";

import { ConfrimProductComponent } from "./layout/confrim-product.component";

@NgModule({
	declarations: [ConfrimProductComponent],
	imports: [CommonModule, ImageModule, CounterModule, TranslocoModule],
	exports: [ConfrimProductComponent]
})
export class ConfirmProductModule {}
