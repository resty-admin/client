import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { map } from "rxjs";

import type { HistoryOrderPageQuery } from "../../graphql";
import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderPageResolver implements Resolve<HistoryOrderPageQuery["order"] | null> {
	constructor(private readonly _historyOrderPageGQL: HistoryOrderPageGQL) {}

	resolve() {
		return this._historyOrderPageGQL.fetch().pipe(map((result) => result.data.order));
	}
}
