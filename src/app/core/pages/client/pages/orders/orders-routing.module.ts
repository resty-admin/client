import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { OrdersComponent } from "./layout/orders.component";

export const ORDERS_ROUTES: Route[] = [
	{
		path: "",
		component: OrdersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class OrdersRoutingModule {}
