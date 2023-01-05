import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ConnectToTableComponent } from "./layout/connect-to-table.component";

export const CONNECT_TO_TABLE_ROUTES: Route[] = [
	{
		path: "",
		component: ConnectToTableComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONNECT_TO_TABLE_ROUTES)],
	exports: [RouterModule]
})
export class ConnectToTableRoutingModule {}
