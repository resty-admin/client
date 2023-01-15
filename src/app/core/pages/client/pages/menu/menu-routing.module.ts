import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./layout/menu.component";

export const MENU_ROUTES: Route[] = [
	{
		path: "",
		component: MenuComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(MENU_ROUTES)],
	exports: [RouterModule]
})
export class MenuRoutingModule {}
