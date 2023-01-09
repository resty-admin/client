import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ProductGQL, ProductsGQL } from "../../graphql/products";

@Injectable({ providedIn: "root" })
export class ProductsService {
	private readonly _productsQuery = this._productsGQL.watch({ skip: 0, take: 5 });

	readonly products$ = this._productsQuery.valueChanges.pipe(map((result) => result.data.products.data));

	constructor(private readonly _productsGQL: ProductsGQL, private readonly _productGQL: ProductGQL) {}

	getProduct(productId: string) {
		return this._productGQL.watch({ productId }).valueChanges.pipe(map((result) => result.data.product));
	}
}
