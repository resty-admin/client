import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { CATEGORY_ID } from "@shared/constants";

import { ProductsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ProductsPageResolver implements Resolve<unknown> {
	constructor(private readonly _productsPageService: ProductsPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const categoryId = activatedRouteSnapshot.paramMap.get(CATEGORY_ID.slice(1));

		if (!categoryId) {
			return;
		}

		this._productsPageService.productsPageQuery
			.setVariables({
				filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }]
			})
			.then();

		this._productsPageService.productsPageQuery.resetLastResults();

		return this._productsPageService.productsPageQuery.valueChanges;
	}
}
