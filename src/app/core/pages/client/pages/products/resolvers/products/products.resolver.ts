import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { OrdersService } from "@features/orders";
import type { Observable } from "rxjs";
import { map, switchMap } from "rxjs";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsResolver implements Resolve<any> {
	constructor(private _productsPageGQL: ProductsPageGQL, private readonly _ordersService: OrdersService) {}

	resolve(): Observable<any> {
		return this._ordersService.productsToOrders$.pipe(
			switchMap((productsToOrders) =>
				this._productsPageGQL.watch().valueChanges.pipe(
					map((result) => result.data.products.data),
					map((products) =>
						(products || []).map((product) => ({
							...product,
							productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
						}))
					)
				)
			)
		);
	}
}
