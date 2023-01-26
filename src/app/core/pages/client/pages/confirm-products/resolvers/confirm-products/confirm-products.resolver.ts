import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ConfirmProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ConfirmProductsResolver implements Resolve<any> {
	constructor(private _confirmProductsPageGQL: ConfirmProductsPageGQL) {}

	resolve(): Observable<any> {
		return this._confirmProductsPageGQL.watch().valueChanges.pipe(map((result) => result.data.products.data));
	}
}
