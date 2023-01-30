import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, map, switchMap } from "rxjs";

import type { ConfirmProductsPageQuery } from "../../graphql";
import { ConfirmProductsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ConfirmProductsPageResolver implements Resolve<ConfirmProductsPageQuery["products"]["data"]> {
	constructor(private readonly _confirmProductsPageService: ConfirmProductsPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1)) || "";

		return from(
			this._confirmProductsPageService.confirmProductsPageQuery.setVariables({
				filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
			})
		).pipe(
			switchMap(() => this._confirmProductsPageService.confirmProductsPageQuery.valueChanges),
			map((result) => result.data.products.data)
		);
	}
}
