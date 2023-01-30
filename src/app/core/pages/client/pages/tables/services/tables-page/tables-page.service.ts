import { Injectable } from "@angular/core";

import { TablesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesPageService {
	readonly tablesPageQuery = this._tablesPageGQL.watch();

	constructor(private readonly _tablesPageGQL: TablesPageGQL) {}
}
