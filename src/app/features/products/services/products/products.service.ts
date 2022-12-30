import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ProductGQL } from "../../graphql/product";
import { ProductsGQL } from "../../graphql/products";

@Injectable({ providedIn: "root" })
export class ProductsService {
	readonly products$ = this._productsGQL.watch().valueChanges.pipe(map((result) => result.data.products.data));

	constructor(private readonly _productsGQL: ProductsGQL, private readonly _productGQL: ProductGQL) {}

	getProduct(productId: string) {
		this._productGQL.watch().setVariables({ productId });

		return this._productGQL.watch().valueChanges.pipe(map((result) => result.data.product));
	}

	async refetch() {
		await this._productsGQL.watch().refetch();
	}
}
