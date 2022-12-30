import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { PlacesGQL } from "../../graphql/places";

@Injectable({ providedIn: "root" })
export class PlacesService {
	readonly places$ = this._placesGQL
		.watch({ skip: 0, take: 5 })
		.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(private readonly _placesGQL: PlacesGQL) {}

	async refetch() {
		await this._placesGQL.watch().refetch();
	}
}
