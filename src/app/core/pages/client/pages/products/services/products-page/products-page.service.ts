import { Injectable } from "@angular/core";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsPageService {
	readonly productsPageQuery = this._productsPageGQL.watch();

	constructor(readonly _productsPageGQL: ProductsPageGQL) {}
}
