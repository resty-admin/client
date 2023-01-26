import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ActiveOrderEntity } from "@graphql";
import { ProductToOrderPaidStatusEnum } from "@graphql";
import { ORDER_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderResolver implements Resolve<any> {
	constructor(private _activeOrderPageGQL: ActiveOrderPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any | null> {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		return this._activeOrderPageGQL.watch({ orderId }).valueChanges.pipe(
			map((result) => result.data.order),
			map((order) => ({
				...(order as ActiveOrderEntity),
				isAllPaid: (order?.productsToOrders || []).every(
					(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
				)
			}))
		);
	}
}
