import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { CATEGORY_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsResolver implements Resolve<any> {
	constructor(private _productsPageGQL: ProductsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any | null> {
		const categoryId = activatedRouteSnapshot.paramMap.get(CATEGORY_ID.slice(1));

		if (!categoryId) {
			return of(null);
		}

		const filtersArgs = [{ key: "category.id", operator: "=", value: categoryId }];

		return this._productsPageGQL.watch({ filtersArgs }).valueChanges.pipe(map((result) => result.data.products.data));
	}
}
