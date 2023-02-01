import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { OrdersService } from "@features/orders";
import { filter, map, switchMap } from "rxjs";

import type { ReferralLinkPageQuery } from "../../graphql";
import { ReferralLinkPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ReferralLinkPageResolver implements Resolve<ReferralLinkPageQuery["order"]> {
	constructor(
		private readonly _referralLinkPageGQL: ReferralLinkPageGQL,
		private readonly _ordersService: OrdersService
	) {}

	resolve() {
		return this._ordersService.activeOrderId$.pipe(
			filter((orderId) => Boolean(orderId)),
			switchMap((orderId) => this._referralLinkPageGQL.fetch({ orderId: orderId! })),
			map((result) => result.data.order)
		);
	}
}
