import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";

import { OrderPreviewComponent } from "./layout/order-preview.component";
import { ORDER_PREVIEW_PROVIDERS } from "./providers";

@NgModule({
	declarations: [OrderPreviewComponent],
	imports: [CommonModule, RouterModule, I18nModule, IconModule],
	providers: ORDER_PREVIEW_PROVIDERS,
	exports: [OrderPreviewComponent]
})
export class OrderPreviewModule {}
