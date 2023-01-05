import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ConnectToOrderComponent } from "./layout/connect-to-order.component";

export const CONNECT_TO_ORDER_ROUTES: Route[] = [
	{
		path: "",
		component: ConnectToOrderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONNECT_TO_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class ConnectToOrderRoutingModule {}
