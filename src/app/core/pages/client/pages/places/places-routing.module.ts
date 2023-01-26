import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PlacesSkeletonComponent } from "@core/pages/client/pages/places/components";
import { PlacesResolver } from "@core/pages/client/pages/places/resolvers";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PLACES_PAGE } from "./constants";
import { PlacesComponent } from "./layout/places.component";

export const PLACES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PlacesComponent,
		data: {
			animation: PLACES_PAGE
		},
		resolve: {
			places: PlacesResolver
		},
		skeleton: {
			component: PlacesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PLACES_ROUTES)],
	exports: [RouterModule]
})
export class PlacesRoutingModule {}
