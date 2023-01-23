import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrderPreviewModule, SkeletonOrderModule } from "@features/orders";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { AllOrdersRoutingModule } from "./all-orders-routing.module";
import { AllOrdersComponent } from "./layout/all-orders.component";
import { ALL_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AllOrdersComponent],
	imports: [
		CommonModule,
		AllOrdersRoutingModule,
		TypographyModule,
		IconModule,
		I18nModule,
		OrderPreviewModule,
		SkeletonOrderModule,
		ImageModule,
		ButtonModule
	],
	providers: ALL_ORDERS_PROVIDERS
})
export class AllOrdersModule {}
