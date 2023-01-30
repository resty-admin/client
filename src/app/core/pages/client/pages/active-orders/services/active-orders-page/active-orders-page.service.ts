import { Injectable } from "@angular/core";

import { ActiveOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrdersPageService {
	readonly activeOrdersPageQuery = this._activeOrdersPageGQL.watch();

	constructor(private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL) {}
}
