import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ACCESS_TOKEN } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";

import { GoogleComponent } from "./layout/google.component";

export const SIGN_IN_ROUTES: Route[] = [
	{
		path: `:${ACCESS_TOKEN}`,
		component: GoogleComponent
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: CLIENT_ROUTES.SIGN_IN.absolutePath
	}
];

@NgModule({
	imports: [RouterModule.forChild(SIGN_IN_ROUTES)],
	exports: [RouterModule]
})
export class GoogleRoutingModule {}
