import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { OrdersService } from "@features/orders";
import type { Observable } from "rxjs";
import { map, switchMap } from "rxjs";

import { ConfirmProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ConfirmProductsResolver implements Resolve<any> {
	constructor(
		private _confirmProductsPageGQL: ConfirmProductsPageGQL,
		private readonly _ordersService: OrdersService
	) {}

	resolve(): Observable<any> {
		return this._confirmProductsPageGQL.watch().valueChanges.pipe(
			map((result) => result.data.products.data),
			switchMap((products) =>
				this._ordersService.productsToOrders$.pipe(
					map((productsToOrders) =>
						(products || [])
							.map((product) => ({
								...product,
								productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
							}))
							.filter((product) => product.productsToOrders.length)
					)
				)
			)
		);
	}
}
