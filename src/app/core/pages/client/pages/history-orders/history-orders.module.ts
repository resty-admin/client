import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewOrderModule, PreviewOrderSkeletonModule } from "@features/orders";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { HISTORY_ORDERS_COMPONENTS } from "./components";
import { HistoryOrdersRoutingModule } from "./history-orders-routing.module";
import { HistoryOrdersComponent } from "./layout/history-orders.component";

@NgModule({
	declarations: [HistoryOrdersComponent, ...HISTORY_ORDERS_COMPONENTS],
	imports: [
		CommonModule,
		HistoryOrdersRoutingModule,
		TypographyModule,
		IconModule,
		I18nModule,
		ImageModule,
		ButtonModule,
		PreviewOrderModule,
		SkeletonModule,
		PreviewOrderSkeletonModule
	]
})
export class HistoryOrdersModule {}
