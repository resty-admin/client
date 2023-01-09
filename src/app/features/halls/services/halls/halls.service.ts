import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { HallsGQL } from "../../graphql/halls";

@Injectable({ providedIn: "root" })
export class HallsService {
	private readonly _hallsQuery = this._hallsGQL.watch({ skip: 0, take: 5 });

	readonly halls$ = this._hallsQuery.valueChanges.pipe(map((result) => result.data.halls.data));

	constructor(private readonly _hallsGQL: HallsGQL) {}
}
