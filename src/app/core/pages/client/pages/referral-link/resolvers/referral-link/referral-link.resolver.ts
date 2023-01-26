import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { OrdersService } from "@features/orders";
import type { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs";

import { ReferralLinkPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ReferralLinkResolver implements Resolve<any> {
	constructor(private _referralLinkPageGQL: ReferralLinkPageGQL, private readonly _ordersService: OrdersService) {}

	resolve(): Observable<any> {
		return this._ordersService.activeOrderId$.pipe(
			filter((orderId) => Boolean(orderId)),
			switchMap((orderId) => this._referralLinkPageGQL.watch({ orderId: orderId! }).valueChanges),
			map((result) => result.data.order)
		);
	}
}
