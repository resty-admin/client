import { Injectable } from "@angular/core";

import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesPageService {
	readonly placesPageQuery = this._placesPageQGL.watch();

	constructor(private readonly _placesPageQGL: PlacesPageGQL) {}
}
