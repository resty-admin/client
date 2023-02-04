import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CreateOrderComponent } from "./layout/create-order.component";

export const CREATE_ORDER_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CreateOrderComponent,
		data: {
			animation: "createOrderPage"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CREATE_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class CreateOrderRoutingModule {}
