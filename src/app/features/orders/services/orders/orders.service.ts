import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { OrderGQL } from "../../graphql/order";
import { OrdersGQL } from "../../graphql/orders";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly orders$ = this._ordersGQL.watch().valueChanges.pipe(map((result) => result.data.orders.data));

	constructor(private readonly _ordersGQL: OrdersGQL, private readonly _orderGQL: OrderGQL) {}

	getOrder(orderId: string) {
		this._orderGQL.watch().setVariables({ orderId });

		return this._orderGQL.watch().valueChanges.pipe(map((result) => result.data.order));
	}

	async refetch() {
		await this._ordersGQL.watch().refetch();
	}
}
