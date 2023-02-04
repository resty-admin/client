import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";

import { PaymentTypePageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentTypePageResolver implements Resolve<unknown> {
	constructor(private readonly _paymentTypePageGQL: PaymentTypePageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		return this._paymentTypePageGQL.fetch({ orderId });
	}
}
