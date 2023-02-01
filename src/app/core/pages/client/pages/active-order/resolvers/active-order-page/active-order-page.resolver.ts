import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";
import { from, map, of, switchMap } from "rxjs";

import type { ActiveOrderPageQuery } from "../../graphql";
import { ActiveOrderPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ActiveOrderPageResolver implements Resolve<ActiveOrderPageQuery["order"] | null> {
	constructor(private readonly _activeOrderPageGQL: ActiveOrderPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		return from(this._activeOrderPageGQL.activeOrderPageQuery.setVariables({ orderId })).pipe(
			switchMap(() => this._activeOrderPageGQL.activeOrderPageQuery.valueChanges),
			map((result) => result.data.order)
		);
	}
}
