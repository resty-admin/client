import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ReferralLinkPageSkeletonComponent } from "./components";
import { REFERRAL_LINK_PAGE } from "./constants";
import { ReferralLinkComponent } from "./layout/referral-link.component";
import { ReferralLinkPageResolver } from "./resolvers";

export const REFERRAL_LINK_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ReferralLinkComponent,
		data: {
			animation: REFERRAL_LINK_PAGE
		},
		resolve: {
			activeOrder: ReferralLinkPageResolver
		},
		skeleton: {
			component: ReferralLinkPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(REFERRAL_LINK_ROUTES)],
	exports: [RouterModule]
})
export class ReferralLinkRoutingModule {}
