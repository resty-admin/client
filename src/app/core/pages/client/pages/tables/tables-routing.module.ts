import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { TablesSkeletonComponent } from "./components";
import { TablesComponent } from "./layout/tables.component";
import { TablesResolver } from "./resolvers";

export const TABLES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: TablesComponent,
		resolve: {
			tables: TablesResolver
		},
		skeleton: {
			component: TablesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(TABLES_ROUTES)],
	exports: [RouterModule]
})
export class TablesRoutingModule {}
