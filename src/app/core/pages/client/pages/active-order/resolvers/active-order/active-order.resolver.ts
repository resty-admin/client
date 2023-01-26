import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ProductToOrderPaidStatusEnum } from "@graphql";
import { ORDER_ID } from "@shared/constants";
import { of } from "rxjs";

import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderResolver implements Resolve<any> {
	readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();

	constructor(private _activeOrderPageGQL: ActiveOrderPageGQL) {}

	async resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		const result = await this._activeOrderPageQuery.refetch({ orderId });

		if (!result.data.order) {
			return of(null);
		}

		return {
			...result.data.order,
			isAllPaid: (result.data.order?.productsToOrders || []).every(
				(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
			)
		};
	}
}
