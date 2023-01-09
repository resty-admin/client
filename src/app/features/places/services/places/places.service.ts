import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { PlacesGQL } from "../../graphql/places";

@Injectable({ providedIn: "root" })
export class PlacesService {
	private readonly _placesQuery = this._placesGQL.watch({ skip: 0, take: 5 });

	readonly places$ = this._placesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(private readonly _placesGQL: PlacesGQL) {}
}
