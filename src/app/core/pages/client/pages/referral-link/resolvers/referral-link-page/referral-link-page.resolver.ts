import { Injectable } from "@angular/core";
import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ORDER_ID } from "@shared/constants";

import { ReferralLinkPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ReferralLinkPageResolver implements Resolve<unknown> {
	constructor(private readonly _referralLinkPageGQL: ReferralLinkPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		return this._referralLinkPageGQL.fetch({ orderId });
	}
}
