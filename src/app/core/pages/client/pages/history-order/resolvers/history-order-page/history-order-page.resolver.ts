import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderPageResolver implements Resolve<unknown> {
	constructor(private readonly _historyOrderPageGQL: HistoryOrderPageGQL) {}

	resolve() {
		return this._historyOrderPageGQL.fetch();
	}
}
