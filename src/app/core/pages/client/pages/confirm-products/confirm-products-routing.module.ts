import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ConfirmProductsPageSkeletonComponent } from "./components";
import { ConfirmProductsComponent } from "./layout/confirm-products.component";
import { ConfirmProductsPageResolver } from "./resolvers";

export const CONFIRM_PRODUCTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ConfirmProductsComponent,
		data: {
			animation: "confirmProductsPage"
		},
		resolve: {
			products: ConfirmProductsPageResolver
		},
		skeleton: {
			component: ConfirmProductsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONFIRM_PRODUCTS_ROUTES)],
	exports: [RouterModule]
})
export class ConfirmProductsRoutingModule {}
