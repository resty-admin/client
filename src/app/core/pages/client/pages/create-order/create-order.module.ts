import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { DialogModule } from "src/app/shared/ui/dialog";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { CreateOrderRoutingModule } from "./create-order-routing.module";
import { CreateOrderComponent } from "./layout/create-order.component";
import { CREATE_ORDER_PAGE_PROVIDERS } from "./providers";

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
		TranslocoModule
	],
	providers: CREATE_ORDER_PAGE_PROVIDERS
})
export class CreateOrderModule {}
