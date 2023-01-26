import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PRODUCT_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { ProductPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductResolver implements Resolve<any> {
	constructor(private _productPageGQL: ProductPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any | null> {
		const productId = activatedRouteSnapshot.paramMap.get(PRODUCT_ID.slice(1));

		if (!productId) {
			return of(null);
		}

		return this._productPageGQL.watch({ productId }).valueChanges.pipe(
			map((result) => result.data.product),
			map((product) => ({
				...product,
				attrsGroups: product.attrsGroups?.map((attrGroup) => ({
					...attrGroup,
					attributes: attrGroup.attributes?.map((attr) => ({
						...attr,
						value: attr.id,
						label: attr.name
					}))
				}))
			}))
		);
	}
}
