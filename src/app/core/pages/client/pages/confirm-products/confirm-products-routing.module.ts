import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ConfirmProductsComponent } from "./layout/confirm-products.component";

export const PRODUCTS_ROUTES: Route[] = [
	{
		path: "",
		component: ConfirmProductsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCTS_ROUTES)],
	exports: [RouterModule]
})
export class ConfirmProductsRoutingModule {}
