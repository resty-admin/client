import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { OrdersService } from "@features/orders";
import { switchMap } from "rxjs";

import { ConfirmProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ConfirmProductsPageResolver implements Resolve<unknown> {
	constructor(
		private readonly _confirmProductsPageGQL: ConfirmProductsPageGQL,
		private readonly _ordersService: OrdersService
	) {}

	resolve() {
		this._ordersService.productsToOrders$.pipe(
			switchMap((productsToOrders) =>
				this._confirmProductsPageGQL.fetch({
					filtersArgs: [
						{
							key: "id",
							operator: "=[]",
							value: (productsToOrders || [])
								.reduce((pre, productToOrder) => `${pre}${productToOrder.productId}.`, "")
								.slice(0, -1)
						}
					],
					take: productsToOrders.length
				})
			)
		);
	}
}
