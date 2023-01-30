import { Injectable } from "@angular/core";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersPageService {
	readonly historyOrdersPageQuery = this._historyOrdersPageGQL.watch();

	constructor(private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL) {}
}
