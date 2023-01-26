import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { HallsSkeletonComponent } from "./components";
import { HallsComponent } from "./layout/halls.component";
import { HallsResolver } from "./resolvers";

export const HALLS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: HallsComponent,
		resolve: {
			halls: HallsResolver
		},
		skeleton: {
			component: HallsSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(HALLS_ROUTES)],
	exports: [RouterModule]
})
export class HallsRoutingModule {}
