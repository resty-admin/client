import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderInfoModule, SkeletonActiveOrderModule } from "@features/orders";
import { PreviewPlaceModule } from "@features/places";
import { ProductsToOrderSelectModule, ProductToOrderModule } from "@features/products";
import { PreviewTableModule } from "@features/tables";
import { UsersSelectModule } from "@features/users/ui/users-select/users-select.module";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderRoutingModule } from "./active-order-routing.module";
import { ActiveOrderComponent } from "./layout/active-order.component";
import { ACTIVE_ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [
		CommonModule,
		ActiveOrderRoutingModule,
		TypographyModule,
		ButtonModule,
		IconModule,
		TranslocoModule,
		ReactiveFormsModule,
		ProductToOrderModule,
		UsersSelectModule,
		PreviewTableModule,
		PreviewPlaceModule,
		ProductsToOrderSelectModule,
		OrderInfoModule,
		SkeletonActiveOrderModule
	],
	exports: [ActiveOrderComponent],
	providers: ACTIVE_ORDER_PROVIDERS
})
export class ActiveOrderModule {}
