import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { RouterService } from "@shared/modules/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { PaymentTypePageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentTypeResolver implements Resolve<any> {
	constructor(private _paymentTypePageGQL: PaymentTypePageGQL, private readonly _routerService: RouterService) {}

	resolve(): Observable<any> {
		return this._paymentTypePageGQL.watch().valueChanges.pipe(
			map((result) => result.data.order),
			map((order) => ({
				...order,
				totalPrice: (order?.productsToOrders || [])
					.filter((productToOrder) =>
						JSON.parse(this._routerService.getQueryParams("products") || "").includes(productToOrder.id)
					)
					.reduce(
						(sum, productToOrder) =>
							sum +
							(productToOrder.product.price +
								(productToOrder.attributes || []).reduce((_sum, attribute) => _sum + attribute.price, 0)) *
								productToOrder.count,
						0
					)
			}))
		);
	}
}
