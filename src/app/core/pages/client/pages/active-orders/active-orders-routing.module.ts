import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ActiveOrdersSkeletonComponent } from "./components";
import { ActiveOrdersComponent } from "./layout/active-orders.component";
import { ActiveOrdersResolver } from "./resolvers";

export const ACTIVE_ORDERS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ActiveOrdersComponent,
		resolve: {
			activeOrders: ActiveOrdersResolver
		},
		skeleton: {
			component: ActiveOrdersSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACTIVE_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class ActiveOrdersRoutingModule {}
