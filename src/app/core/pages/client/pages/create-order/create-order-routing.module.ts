import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CreateOrderComponent } from "./layout/create-order.component";

export const CREATE_ORDER_ROUTES: Route[] = [
	{
		path: "",
		component: CreateOrderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(CREATE_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class CreateOrderRoutingModule {}
