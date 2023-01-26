import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { WelcomeComponent } from "./layout/welcome.component";

export const WELCOME_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: WelcomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(WELCOME_ROUTES)],
	exports: [RouterModule]
})
export class WelcomeRoutingModule {}
