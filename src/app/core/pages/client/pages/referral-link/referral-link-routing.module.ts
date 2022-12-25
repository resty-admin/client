import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ReferralLinkComponent } from "./layout/referral-link.component";

export const REFERRAL_LINK_ROUTES: Route[] = [
	{
		path: "",
		component: ReferralLinkComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(REFERRAL_LINK_ROUTES)],
	exports: [RouterModule]
})
export class ReferralLinkRoutingModule {}
