import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CLIENT_ROUTES as _SHARED_CLIENT_ROUTES } from "../../../../../shared/constants";
import { MenuComponent } from "./layout/menu.component";

export const MENU_ROUTES: Route[] = [
	{
		path: "",
		component: MenuComponent
	},
	{
		..._SHARED_CLIENT_ROUTES.CATEGORIES,
		component: MenuComponent
	},
	{
		..._SHARED_CLIENT_ROUTES.CATEGORY,
		pathMatch: "full",
		redirectTo: _SHARED_CLIENT_ROUTES.PRODUCTS.path
	},
	{
		..._SHARED_CLIENT_ROUTES.PRODUCTS,
		component: MenuComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(MENU_ROUTES)],
	exports: [RouterModule]
})
export class MenuRoutingModule {}
