import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ProductsErrorPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsErrorResolver implements Resolve<any> {
	constructor(private _productsErrorPageGQL: ProductsErrorPageGQL) {}

	resolve(): Observable<any> {
		return this._productsErrorPageGQL.watch().valueChanges.pipe(map((result) => result.data.products.data));
	}
}
