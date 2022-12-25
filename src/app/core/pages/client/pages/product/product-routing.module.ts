import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ProductComponent } from "./layout/product.component";

export const PRODUCT_ROUTES: Route[] = [
	{
		path: "",
		component: ProductComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCT_ROUTES)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
