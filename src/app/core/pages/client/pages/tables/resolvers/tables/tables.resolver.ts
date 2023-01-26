import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { OrdersService } from "@features/orders";
import type { Observable } from "rxjs";
import { map, of, switchMap } from "rxjs";

import { TablesPageGQL, TablesPageOrderGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesResolver implements Resolve<any> {
	constructor(
		private _tablesPageGQL: TablesPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _tablesPageOrderGQL: TablesPageOrderGQL
	) {}

	resolve(): Observable<any> {
		return this._tablesPageGQL.watch().valueChanges.pipe(
			map((result) => result.data.tables.data),
			switchMap((tables) =>
				this._ordersService.activeOrderId$.pipe(
					switchMap((orderId) =>
						orderId
							? this._tablesPageOrderGQL.watch({ orderId }).valueChanges.pipe(map((result) => result.data?.order))
							: of(null)
					),
					map((order) => (tables || []).map((table) => ({ ...table, active: table.id === order?.table?.id })))
				)
			)
		);
	}
}
