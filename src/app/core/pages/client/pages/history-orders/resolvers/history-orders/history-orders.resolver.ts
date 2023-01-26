import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersResolver implements Resolve<any> {
	constructor(private _historyOrdersPageGQL: HistoryOrdersPageGQL) {}

	resolve(): Observable<any> {
		return this._historyOrdersPageGQL.watch().valueChanges.pipe(
			map((result) => result.data.historyOrders.data),
			map((historyOrders) =>
				(historyOrders || []).map((historyOrder) => ({
					...historyOrder,
					routerLink: CLIENT_ROUTES.HISTORY_ORDER.absolutePath.replace(ORDER_ID, historyOrder.id)
				}))
			)
		);
	}
}
