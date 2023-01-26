import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { CreateOrderSkeletonComponent } from "./components";
import { CreateOrderComponent } from "./layout/create-order.component";
import { CreateOrderResolver } from "./resolvers";

export const CREATE_ORDER_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: CreateOrderComponent,
		resolve: {
			places: CreateOrderResolver
		},
		skeleton: {
			component: CreateOrderSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CREATE_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class CreateOrderRoutingModule {}
