import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { TableComponent } from "./layout/table.component";

export const TABLE_ROUTES: Route[] = [
	{
		path: "",
		component: TableComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(TABLE_ROUTES)],
	exports: [RouterModule]
})
export class TableRoutingModule {}
