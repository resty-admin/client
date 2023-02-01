import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CONNECT_TO_TABLE_PAGE } from "./constants";
import { ConnectToTableComponent } from "./layout/connect-to-table.component";

export const CONNECT_TO_TABLE_ROUTES: Route[] = [
	{
		path: "",
		component: ConnectToTableComponent,
		data: {
			animation: CONNECT_TO_TABLE_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONNECT_TO_TABLE_ROUTES)],
	exports: [RouterModule]
})
export class ConnectToTableRoutingModule {}
