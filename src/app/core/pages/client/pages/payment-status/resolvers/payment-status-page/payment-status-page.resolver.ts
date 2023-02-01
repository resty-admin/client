import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";
import { map, of, switchMap } from "rxjs";

import type { PaymentStatusPageQuery } from "../../graphql";
import { PaymentStatusPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class PaymentStatusPageResolver implements Resolve<PaymentStatusPageQuery["order"] | null> {
	constructor(private readonly _paymentStatusPageService: PaymentStatusPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		return of(this._paymentStatusPageService.paymentStatusPageQuery.setVariables({ orderId })).pipe(
			switchMap(() => this._paymentStatusPageService.paymentStatusPageQuery.valueChanges),
			map((result) => result.data.order)
		);
	}
}
