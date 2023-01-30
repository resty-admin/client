import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { TablePageSkeletonComponent } from "./components";
import { TABLE_PAGE } from "./constants";
import { TableComponent } from "./layout/table.component";
import { TablePageResolver } from "./resolvers";

export const TABLE_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: TableComponent,
		data: {
			animation: TABLE_PAGE
		},
		resolve: {
			table: TablePageResolver
		},
		skeleton: {
			component: TablePageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(TABLE_ROUTES)],
	exports: [RouterModule]
})
export class TableRoutingModule {}
