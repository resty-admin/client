import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { TablePageGQL } from "@core/pages/client/pages/table/graphql";
import { TABLE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class TableResolver implements Resolve<any> {
	constructor(private _tablesPageGQL: TablePageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any | null> {
		const tableId = activatedRouteSnapshot.paramMap.get(TABLE_ID.slice(1));

		if (!tableId) {
			return of(null);
		}

		return this._tablesPageGQL.watch({ tableId }).valueChanges.pipe(map((result) => result.data.table));
	}
}
