import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { AuthService } from "@features/auth";
import { from, map, switchMap, take } from "rxjs";

import type { ActiveOrdersPageQuery } from "../../graphql";
import { ActiveOrdersPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ActiveOrdersPageResolver implements Resolve<ActiveOrdersPageQuery["orders"]["data"]> {
	constructor(
		private readonly _activeOrdersPageQuery: ActiveOrdersPageService,
		private readonly _authService: AuthService
	) {}

	resolve() {
		return this._authService.me$.pipe(take(1)).pipe(
			switchMap((user) =>
				from(
					this._activeOrdersPageQuery.activeOrdersPageQuery.setVariables({
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					})
				)
			),
			switchMap(() => this._activeOrdersPageQuery.activeOrdersPageQuery.valueChanges),
			map((result) => result.data.orders.data)
		);
	}
}
