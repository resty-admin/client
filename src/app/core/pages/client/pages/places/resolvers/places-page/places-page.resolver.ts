import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { from, map, switchMap } from "rxjs";

import { PlacesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class PlacesPageResolver implements Resolve<unknown> {
	constructor(private readonly _placesPageService: PlacesPageService) {}

	async resolve() {
		return from(this._placesPageService.placesPageQuery.setVariables({})).pipe(
			switchMap(() => this._placesPageService.placesPageQuery.valueChanges),
			map((result) => result.data.places.data)
		);
	}
}
