import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, map, of, switchMap } from "rxjs";

import type { CategoriesPageQuery } from "../../graphql";
import { CategoriesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class CategoriesPageResolver implements Resolve<CategoriesPageQuery["categories"]["data"]> {
	constructor(private readonly _categoriesPageService: CategoriesPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return from(
			this._categoriesPageService.categoriesQuery.setVariables({
				filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
			})
		).pipe(
			switchMap(() => this._categoriesPageService.categoriesQuery.valueChanges),
			map((result) => result.data.categories.data)
		);
	}
}
