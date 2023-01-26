import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { ProductToOrderStatusEnum } from "@graphql";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderResolver implements Resolve<any> {
	readonly displayStatuses = [ProductToOrderStatusEnum.WaitingForApprove, ProductToOrderStatusEnum.Approved];

	constructor(private _historyOrderPageGQL: HistoryOrderPageGQL) {}

	resolve(): Observable<any> {
		return this._historyOrderPageGQL.watch().valueChanges.pipe(
			map((result) => result.data.order),
			map((order) => ({
				...order,
				productsToOrdersByType: this.displayStatuses.map((status) => ({
					status,
					productsToOrders: (order?.productsToOrders || []).filter((productToOrder) => productToOrder.status === status)
				}))
			}))
		);
	}
}
