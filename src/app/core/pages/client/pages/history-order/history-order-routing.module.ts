import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { HistoryOrderSkeletonComponent } from "./components";
import { HistoryOrderComponent } from "./layout/history-order.component";
import { HistoryOrderResolver } from "./resolvers";

export const HISTORY_ORDER_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: HistoryOrderComponent,
		resolve: {
			historyOrder: HistoryOrderResolver
		},
		skeleton: {
			component: HistoryOrderSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(HISTORY_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class HistoryOrderRoutingModule {}
