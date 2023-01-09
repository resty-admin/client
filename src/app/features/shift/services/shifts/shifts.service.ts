import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ShiftsGQL } from "../../graphql/shift";

@Injectable({ providedIn: "root" })
export class ShiftsService {
	private readonly _shiftsQuery = this._shiftsGQL.watch({ skip: 0, take: 5 });

	readonly shifts$ = this._shiftsQuery.valueChanges.pipe(map((result) => result.data.shifts.data));

	constructor(private readonly _shiftsGQL: ShiftsGQL) {}
}
