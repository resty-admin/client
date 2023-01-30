import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { OrdersService } from "@features/orders";
import { PLACE_ID } from "@shared/constants";
import { map, of, switchMap } from "rxjs";

import type { HallsPageQuery } from "../../graphql";
import { HallsPageGQL, HallsPageOrderGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsPageResolver implements Resolve<HallsPageQuery["halls"]["data"]> {
	constructor(
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _hallsPageOrderGQL: HallsPageOrderGQL
	) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._hallsPageGQL.fetch({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] }).pipe(
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
