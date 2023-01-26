import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ProductSkeletonComponent } from "./components";
import { PRODUCT_PAGE } from "./constants";
import { ProductComponent } from "./layout/product.component";
import { ProductResolver } from "./resolvers";

export const PRODUCT_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ProductComponent,
		data: {
			animation: PRODUCT_PAGE
		},
		resolve: {
			product: ProductResolver
		},
		skeleton: {
			component: ProductSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCT_ROUTES)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
