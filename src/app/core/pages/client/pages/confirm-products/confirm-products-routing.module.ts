import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ConfirmProductsSkeletonComponent } from "./components";
import { CONFIRM_PRODUCTS_PAGE } from "./constants";
import { ConfirmProductsComponent } from "./layout/confirm-products.component";
import { ConfirmProductsResolver } from "./resolvers";

export const CONFIRM_PRODUCTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ConfirmProductsComponent,
		data: {
			animation: CONFIRM_PRODUCTS_PAGE
		},
		resolve: {
			products: ConfirmProductsResolver
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
