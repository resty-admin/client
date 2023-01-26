import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ActiveOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrdersResolver implements Resolve<any> {
	constructor(private _activeOrdersPageGQL: ActiveOrdersPageGQL) {}

	resolve(): Observable<any> {
		return this._activeOrdersPageGQL.watch().valueChanges.pipe(
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
