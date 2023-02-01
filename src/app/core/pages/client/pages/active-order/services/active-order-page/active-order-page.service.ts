import { Injectable } from "@angular/core";

import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderPageService {
	readonly activeOrderPageQuery = this._activeOrderPageGQL.watch();

	constructor(private readonly _activeOrderPageGQL: ActiveOrderPageGQL) {}
}
