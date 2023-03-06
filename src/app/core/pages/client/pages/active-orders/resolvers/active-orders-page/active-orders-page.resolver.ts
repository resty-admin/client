import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { AuthService } from "@features/auth";
import { switchMap } from "rxjs";

import { ActiveOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrdersPageResolver implements Resolve<unknown> {
	constructor(private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL, private readonly _authService: AuthService) {}

	resolve() {
		return this._authService.me$.pipe(
			switchMap((user) =>
				this._activeOrdersPageGQL.fetch(
					{
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					},
					{ fetchPolicy: "network-only" }
				)
			)
		);
	}
}
