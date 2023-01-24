import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrderPreviewModule, SkeletonOrderModule } from "@features/orders";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { HistoryOrdersRoutingModule } from "./history-orders-routing.module";
import { HistoryOrdersComponent } from "./layout/history-orders.component";
import { HISTORY_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HistoryOrdersComponent],
	imports: [
		CommonModule,
		HistoryOrdersRoutingModule,
		TypographyModule,
		IconModule,
		I18nModule,
		OrderPreviewModule,
		SkeletonOrderModule,
		ImageModule,
		ButtonModule
	],
	providers: HISTORY_ORDERS_PROVIDERS
})
export class HistoryOrdersModule {}
