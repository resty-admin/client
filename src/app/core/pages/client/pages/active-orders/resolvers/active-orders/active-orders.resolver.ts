import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs";

import { ActiveOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrdersResolver implements Resolve<any> {
	constructor(private _activeOrdersPageGQL: ActiveOrdersPageGQL, private readonly _authService: AuthService) {}

	resolve(): Observable<any> {
		return this._authService.me$.pipe(take(1)).pipe(
			switchMap(
				(user) =>
					this._activeOrdersPageGQL.watch({
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					}).valueChanges
			),
			map((result) => result.data.orders.data),
			map((orders) =>
				(orders || []).map((order) => ({
					...order,
					routerLink: CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, order.id)
				}))
			)
		);
	}
}
