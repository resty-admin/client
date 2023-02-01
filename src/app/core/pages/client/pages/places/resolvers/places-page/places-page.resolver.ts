import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesPageResolver implements Resolve<unknown> {
	constructor(private readonly _placesPageGQL: PlacesPageGQL) {}

	async resolve() {
		return this._placesPageGQL.fetch();
	}
}
