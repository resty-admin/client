import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { TypographyModule } from "src/app/shared/ui/typography";

import { OrdersComponent } from "./layout/orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";

@NgModule({
	declarations: [OrdersComponent],
	imports: [CommonModule, OrdersRoutingModule, TypographyModule, IconModule],
	exports: [OrdersComponent]
})
export class OrdersModule {}
