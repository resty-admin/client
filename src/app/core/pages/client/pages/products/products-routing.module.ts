import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ProductsSkeletonComponent } from "./components";
import { ProductsComponent } from "./layout/products.component";
import { ProductsResolver } from "./resolvers";

export const PRODUCTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ProductsComponent,
		resolve: {
			products: ProductsResolver
		},
		skeleton: {
			component: ProductsSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ROUTES)],
	exports: [RouterModule]
})
export class ProductsRoutingModule {}
