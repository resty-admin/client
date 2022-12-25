import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ProductsErrorComponent } from "./layout/products-error.component";

export const PRODUCTS_ERROR_ROUTES: Route[] = [
	{
		path: "",
		component: ProductsErrorComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ERROR_ROUTES)],
	exports: [RouterModule]
})
export class ProductsErrorRoutingModule {}
