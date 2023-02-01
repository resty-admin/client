import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { map, of, switchMap } from "rxjs";

import type { ProductsErrorPageQuery } from "../../graphql";
import { ProductsErrorPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ProductsErrorPageResolver implements Resolve<ProductsErrorPageQuery["products"]["data"]> {
	constructor(private readonly _productsErrorPageService: ProductsErrorPageService) {}

	resolve() {
		return of(this._productsErrorPageService.productsErrorPageQuery.setVariables({})).pipe(
			switchMap(() => this._productsErrorPageService.productsErrorPageQuery.valueChanges),
			map((result) => result.data.products.data)
		);
	}
}
