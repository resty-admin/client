import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlreadyExistModule } from "@features/orders/ui/already-exist";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DialogModule } from "@shared/ui/dialog";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { CreateOrderRoutingModule } from "./create-order-routing.module";
import { CreateOrderComponent } from "./layout/create-order.component";

@NgModule({
	declarations: [CreateOrderComponent],
	imports: [
		CommonModule,
		CreateOrderRoutingModule,
		TypographyModule,
		ImageModule,
		ButtonModule,
		IconModule,
		DialogModule,
		TranslocoModule,
		AlreadyExistModule,
		SkeletonModule
	]
})
export class CreateOrderModule {}
