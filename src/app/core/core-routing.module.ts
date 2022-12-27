import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CLIENT_ROUTES } from "../shared/routes";
import { ROUTER_CONFIG } from "./configs/router.config";
import { AuthGuard } from "./pages/auth/guards";

export const CORE_ROUTES: Route[] = [
	{
		...CLIENT_ROUTES.AUTH,
		loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule)
	},
	{
		...CLIENT_ROUTES.CLIENT,
		canActivate: [AuthGuard],
		loadChildren: () => import("./pages/client/client.module").then((m) => m.ClientModule)
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: CLIENT_ROUTES.CLIENT.path
	}
];
@NgModule({
	imports: [RouterModule.forRoot(CORE_ROUTES, ROUTER_CONFIG)],
	exports: [RouterModule]
})
export class CoreRoutingModule {}
