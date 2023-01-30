import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { AuthService } from "@features/auth";
import { from, map, switchMap, take } from "rxjs";

import type { HistoryOrdersPageQuery } from "../../graphql";
import { HistoryOrdersPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class HistoryOrdersPageResolver implements Resolve<HistoryOrdersPageQuery["historyOrders"]["data"]> {
	constructor(
		private readonly _historyOrdersPageService: HistoryOrdersPageService,
		private readonly _authService: AuthService
	) {}

	resolve() {
		return this._authService.me$.pipe(take(1)).pipe(
			switchMap((user) =>
				from(
					this._historyOrdersPageService.historyOrdersPageQuery.setVariables({
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					})
				)
			),
			switchMap(() => this._historyOrdersPageService.historyOrdersPageQuery.valueChanges),
			map((result) => result.data.historyOrders.data)
		);
	}
}
