import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { ProductToOrderPaidStatusEnum } from "@graphql";
import type { Observable } from "rxjs";
import { map, shareReplay } from "rxjs";

import { PaymentStatusPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentStatusResolver implements Resolve<any> {
	constructor(private _paymentStatusPageGQL: PaymentStatusPageGQL) {}

	resolve(): Observable<any> {
		return this._paymentStatusPageGQL.watch().valueChanges.pipe(
			map((result) => result.data.order),
			map((order) => ({
				...order,
				isAllPaid: (order?.productsToOrders || []).every(
					(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
				)
			})),
			shareReplay({ refCount: true })
		);
	}
}
