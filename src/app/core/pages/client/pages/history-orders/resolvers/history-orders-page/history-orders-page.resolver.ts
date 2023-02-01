import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { AuthService } from "@features/auth";
import { switchMap } from "rxjs";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersPageResolver implements Resolve<unknown> {
	constructor(
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _authService: AuthService
	) {}

	resolve() {
		return this._authService.me$.pipe(
			switchMap((user) =>
				this._historyOrdersPageGQL.fetch({
					filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
				})
			)
		);
	}
}
