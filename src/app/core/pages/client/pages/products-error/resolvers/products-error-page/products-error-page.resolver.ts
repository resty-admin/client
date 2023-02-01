import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { ProductsErrorPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsErrorPageResolver implements Resolve<unknown> {
	constructor(private readonly _productsErrorPageGQL: ProductsErrorPageGQL) {}

	resolve() {
		return this._productsErrorPageGQL.fetch();
	}
}
