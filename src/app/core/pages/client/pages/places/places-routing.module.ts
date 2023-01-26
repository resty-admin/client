import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PlacesSkeletonComponent } from "@core/pages/client/pages/places/components";
import { PlacesResolver } from "@core/pages/client/pages/places/resolvers";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PlacesComponent } from "./layout/places.component";

export const PLACES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PlacesComponent,
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
