import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersPageResolver implements Resolve<unknown> {
	constructor(private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL) {}

	resolve() {
		this._historyOrdersPageGQL.fetch();
	}
}
