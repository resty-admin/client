import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ProductsErrorSkeletonComponent } from "./components";
import { PRODUCTS_ERROR_PAGE } from "./constants";
import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorResolver } from "./resolvers";

export const PRODUCTS_ERROR_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ProductsErrorComponent,
		data: {
			animation: PRODUCTS_ERROR_PAGE
		},
		resolve: {
			products: ProductsErrorResolver
		},
		skeleton: {
			component: ProductsErrorSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ERROR_ROUTES)],
	exports: [RouterModule]
})
export class ProductsErrorRoutingModule {}
