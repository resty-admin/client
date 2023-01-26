import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { TableSkeletonComponent } from "./components";
import { TableComponent } from "./layout/table.component";
import { TableResolver } from "./resolvers";

export const TABLE_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: TableComponent,
		resolve: {
			halls: TableResolver
		},
		skeleton: {
			component: TableSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(TABLE_ROUTES)],
	exports: [RouterModule]
})
export class TableRoutingModule {}
