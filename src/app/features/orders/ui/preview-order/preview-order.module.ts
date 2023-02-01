import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";

import { PreviewOrderComponent } from "./layout/preview-order.component";

@NgModule({
	declarations: [PreviewOrderComponent],
	imports: [CommonModule, I18nModule, IconModule],
	exports: [PreviewOrderComponent]
})
export class PreviewOrderModule {}
