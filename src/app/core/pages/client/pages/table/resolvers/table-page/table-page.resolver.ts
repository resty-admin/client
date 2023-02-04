import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { TABLE_ID } from "@shared/constants";
import { map } from "rxjs";

import { TablePageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablePageResolver implements Resolve<unknown> {
	constructor(private readonly _tablesPageGQL: TablePageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const tableId = activatedRouteSnapshot.paramMap.get(TABLE_ID.slice(1));

		if (!tableId) {
			return;
		}

		return this._tablesPageGQL.fetch({ tableId }).pipe(map((result) => result.data.table));
	}
}
