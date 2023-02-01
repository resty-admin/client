import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";
import { map, of, switchMap } from "rxjs";

import type { PaymentTypePageQuery } from "../../graphql";
import { PaymentTypePageService } from "../../services";

@Injectable({ providedIn: "root" })
export class PaymentTypePageResolver implements Resolve<PaymentTypePageQuery["order"] | null> {
	constructor(private readonly _paymentTypePageService: PaymentTypePageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		return of(
			this._paymentTypePageService.paymentTypePageQuery.setVariables({
				orderId
			})
		).pipe(
			switchMap(() => this._paymentTypePageService.paymentTypePageQuery.valueChanges),
			map((result) => result.data.order)
		);
	}
}
