import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { HALL_ID } from "@shared/constants";
import { map, of, switchMap } from "rxjs";

import type { TablesPageQuery } from "../../graphql";
import { TablesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class TablesPageResolver implements Resolve<TablesPageQuery["tables"]["data"]> {
	constructor(private readonly _tablesPageService: TablesPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const hallId = activatedRouteSnapshot.paramMap.get(HALL_ID.slice(1));

		if (!hallId) {
			return of(null);
		}

		return of(
			this._tablesPageService.tablesPageQuery.setVariables({
				filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
			})
		).pipe(
			switchMap(() => this._tablesPageService.tablesPageQuery.valueChanges),
			map((result) => result.data.tables.data)
		);
	}
}
