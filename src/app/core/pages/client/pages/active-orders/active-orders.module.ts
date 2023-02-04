import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PreviewOrderModule, PreviewOrderSkeletonModule } from "@features/orders";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrdersRoutingModule } from "./active-orders-routing.module";
import { ACTIVE_ORDERS_COMPONENTS } from "./components";
import { ActiveOrdersComponent } from "./layout/active-orders.component";

@NgModule({
	declarations: [ActiveOrdersComponent, ...ACTIVE_ORDERS_COMPONENTS],
	imports: [
		CommonModule,
		ActiveOrdersRoutingModule,
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
export class ActiveOrdersModule {}
