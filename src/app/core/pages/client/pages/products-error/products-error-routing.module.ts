import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ProductsErrorPageSkeletonComponent } from "./components";
import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorPageResolver } from "./resolvers";

export const PRODUCTS_ERROR_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ProductsErrorComponent,
		data: {
			animation: "productsErrorPage"
		},
		resolve: {
			products: ProductsErrorPageResolver
		},
		skeleton: {
			component: ProductsErrorPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ERROR_ROUTES)],
	exports: [RouterModule]
})
export class ProductsErrorRoutingModule {}
