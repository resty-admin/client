import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { OrdersService } from "@features/orders";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of, switchMap } from "rxjs";

import { HallsPageGQL, HallsPageOrderGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsResolver implements Resolve<any> {
	constructor(
		private _hallsPageGQL: HallsPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _hallsPageOrderGQL: HallsPageOrderGQL
	) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any | null> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		const filtersArgs = [{ key: "place.id", operator: "=", value: placeId }];

		return this._hallsPageGQL.watch({ filtersArgs }).valueChanges.pipe(
			map((result) => result.data.halls.data),
			switchMap((halls) =>
				this._ordersService.activeOrderId$.pipe(
					switchMap((orderId) =>
						orderId
							? this._hallsPageOrderGQL.watch({ orderId }).valueChanges.pipe(map((result) => result.data.order))
							: of(null)
					),
					map((order) => (halls || []).map((hall) => ({ ...hall, active: hall.id === order?.table?.hall?.id })))
				)
			)
		);
	}
}
