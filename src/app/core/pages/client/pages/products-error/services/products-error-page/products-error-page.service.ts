import { Injectable } from "@angular/core";

import { ProductsErrorPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsErrorPageService {
	readonly productsErrorPageQuery = this._productsErrorPageGQL.watch();

	constructor(private readonly _productsErrorPageGQL: ProductsErrorPageGQL) {}
}
