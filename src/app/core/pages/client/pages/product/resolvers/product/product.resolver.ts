import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ProductPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductResolver implements Resolve<any> {
	constructor(private _productPageGQL: ProductPageGQL) {}

	resolve(): Observable<any> {
		return this._productPageGQL.watch().valueChanges.pipe(
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
