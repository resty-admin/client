import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";

import { PreviewOrderComponent } from "./layout/preview-order.component";
import { PREVIEW_ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [PreviewOrderComponent],
	imports: [CommonModule, I18nModule, IconModule],
	providers: PREVIEW_ORDER_PROVIDERS,
	exports: [PreviewOrderComponent]
})
export class PreviewOrderModule {}
