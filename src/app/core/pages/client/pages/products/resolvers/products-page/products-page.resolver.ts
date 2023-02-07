import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { CATEGORY_ID } from "@shared/constants";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsPageResolver implements Resolve<unknown> {
	constructor(private readonly _productsPageGQL: ProductsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const categoryId = activatedRouteSnapshot.paramMap.get(CATEGORY_ID.slice(1));

		if (!categoryId) {
			return;
		}

		return this._productsPageGQL.fetch(
			{
				filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }]
			},
			{ fetchPolicy: "network-only" }
		);
	}
}
