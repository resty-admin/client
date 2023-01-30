import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { TABLE_ID } from "@shared/constants";
import { map, of } from "rxjs";

import type { TablePageQuery } from "../../graphql";
import { TablePageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablePageResolver implements Resolve<TablePageQuery["table"] | null> {
	constructor(private readonly _tablesPageGQL: TablePageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const tableId = activatedRouteSnapshot.paramMap.get(TABLE_ID.slice(1));

		if (!tableId) {
			return of(null);
		}

		return this._tablesPageGQL.fetch({ tableId }).pipe(map((result) => result.data.table));
	}
}
