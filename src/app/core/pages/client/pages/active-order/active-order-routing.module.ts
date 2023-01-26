import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ActiveOrderSkeletonComponent } from "./components";
import { ActiveOrderComponent } from "./layout/active-order.component";
import { ActiveOrderResolver } from "./resolvers";

export const ACTIVE_ORDER_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ActiveOrderComponent,
		resolve: {
			activeOrder: ActiveOrderResolver
		},
		skeleton: {
			component: ActiveOrderSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACTIVE_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class ActiveOrderRoutingModule {}
