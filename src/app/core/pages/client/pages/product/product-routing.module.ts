import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ProductPageSkeletonComponent } from "./components";
import { PRODUCT_PAGE } from "./constants";
import { ProductComponent } from "./layout/product.component";
import { ProductPageResolver } from "./resolvers";

export const PRODUCT_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ProductComponent,
		data: {
			animation: PRODUCT_PAGE
		},
		resolve: {
			product: ProductPageResolver
		},
		skeleton: {
			component: ProductPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCT_ROUTES)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
