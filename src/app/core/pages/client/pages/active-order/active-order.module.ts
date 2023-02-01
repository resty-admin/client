import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CancelConfirmationModule, OrderInfoModule, OrderInfoSkeletonModule } from "@features/orders";
import { CloseConfirmationModule } from "@features/orders/ui";
import { PreviewPlaceModule } from "@features/places";
import { ProductsToOrderSelectModule, ProductToOrderModule } from "@features/products";
import { ProductsToOrderSelectSkeletonModule } from "@features/products/ui/products-to-order-select-skeleton";
import { PreviewTableModule } from "@features/tables";
import { UsersSelectModule, UsersSelectSkeletonModule } from "@features/users";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderRoutingModule } from "./active-order-routing.module";
import { ACTIVE_ORDER_COMPONENTS } from "./components";
import { ActiveOrderComponent } from "./layout/active-order.component";

@NgModule({
	declarations: [ActiveOrderComponent, ...ACTIVE_ORDER_COMPONENTS],
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
		CancelConfirmationModule,
		CloseConfirmationModule,
		ImageModule,
		OrderInfoSkeletonModule,
		UsersSelectSkeletonModule,
		ProductsToOrderSelectSkeletonModule
	],
	exports: [ActiveOrderComponent]
})
export class ActiveOrderModule {}
