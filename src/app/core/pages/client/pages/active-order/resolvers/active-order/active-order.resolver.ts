import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActiveOrderEntity } from "@graphql";
import { ProductToOrderPaidStatusEnum } from "@graphql";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderResolver implements Resolve<any> {
	constructor(private _activeOrderPageGQL: ActiveOrderPageGQL) {}

	resolve(): Observable<any> {
		return this._activeOrderPageGQL.watch().valueChanges.pipe(
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
