import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ConfirmProductsSkeletonComponent } from "./components";
import { ConfirmProductsComponent } from "./layout/confirm-products.component";
import { ConfirmProductsResolver } from "./resolvers";

export const CONFIRM_PRODUCTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ConfirmProductsComponent,
		resolve: {
			activeOrders: ConfirmProductsResolver
		},
		skeleton: {
			component: ConfirmProductsSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONFIRM_PRODUCTS_ROUTES)],
	exports: [RouterModule]
})
export class ConfirmProductsRoutingModule {}
