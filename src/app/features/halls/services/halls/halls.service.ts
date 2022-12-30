import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { HallsGQL } from "../../graphql/halls";

@Injectable({ providedIn: "root" })
export class HallsService {
	readonly halls$ = this._hallsGQL
		.watch({ skip: 0, take: 5 })
		.valueChanges.pipe(map((result) => result.data.halls.data));

	constructor(private readonly _hallsGQL: HallsGQL) {}

	async refetch() {
		await this._hallsGQL.watch().refetch();
	}
}
