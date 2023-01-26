import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersResolver implements Resolve<any> {
	constructor(private _historyOrdersPageGQL: HistoryOrdersPageGQL, private readonly _authService: AuthService) {}

	resolve(): Observable<any> {
		return this._authService.me$.pipe(take(1)).pipe(
			switchMap(
				(user) =>
					this._historyOrdersPageGQL.watch({
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					}).valueChanges
			),
			map((result) => result.data.historyOrders.data),
			map((orders) =>
				(orders || []).map((order) => ({
					...order,
					routerLink: CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, order.id)
				}))
			)
		);
	}
}
