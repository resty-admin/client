import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CLIENT_ROUTES as _SHARED_CLIENT_ROUTES } from "@shared/constants";

import { SchemaComponent } from "./layout/schema.component";

export const SCHEMA_ROUTES: Route[] = [
	{
		path: "",
		component: SchemaComponent
	},
	{
		..._SHARED_CLIENT_ROUTES.HALLS,
		component: SchemaComponent
	},
	{
		..._SHARED_CLIENT_ROUTES.HALL,
		pathMatch: "full",
		redirectTo: _SHARED_CLIENT_ROUTES.TABLES.path
	},
	{
		..._SHARED_CLIENT_ROUTES.TABLES,
		component: SchemaComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(SCHEMA_ROUTES)],
	exports: [RouterModule]
})
export class SchemaRoutingModule {}
