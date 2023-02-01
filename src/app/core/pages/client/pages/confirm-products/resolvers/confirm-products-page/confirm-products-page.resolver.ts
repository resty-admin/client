import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";

import { ConfirmProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ConfirmProductsPageResolver implements Resolve<unknown> {
	constructor(private readonly _confirmProductsPageGQL: ConfirmProductsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1)) || "";

		return this._confirmProductsPageGQL.fetch({
			filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
		});
	}
}
