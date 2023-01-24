import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrderPreviewModule, SkeletonOrderModule } from "@features/orders";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrdersRoutingModule } from "./active-orders-routing.module";
import { ActiveOrdersComponent } from "./layout/active-orders.component";
import { ACTIVE_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ActiveOrdersComponent],
	imports: [
		CommonModule,
		ActiveOrdersRoutingModule,
		TypographyModule,
		IconModule,
		I18nModule,
		OrderPreviewModule,
		SkeletonOrderModule,
		ImageModule,
		ButtonModule
	],
	providers: ACTIVE_ORDERS_PROVIDERS
})
export class ActiveOrdersModule {}
