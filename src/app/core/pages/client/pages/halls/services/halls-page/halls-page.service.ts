import { Injectable } from "@angular/core";

import { HallsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsPageService {
	readonly hallsPageQuery = this._hallsPageGQL.watch();

	constructor(private readonly _hallsPageGQL: HallsPageGQL) {}
}
