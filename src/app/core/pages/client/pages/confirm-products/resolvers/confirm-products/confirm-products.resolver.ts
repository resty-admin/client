import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ConfirmProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ConfirmProductsResolver implements Resolve<any> {
	constructor(private _confirmProductsPageGQL: ConfirmProductsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1)) || "";

		const filtersArgs = [{ key: "category.place.id", operator: "=", value: placeId }];

		return this._confirmProductsPageGQL
			.watch({ filtersArgs })
			.valueChanges.pipe(map((result) => result.data.products.data));
	}
}
