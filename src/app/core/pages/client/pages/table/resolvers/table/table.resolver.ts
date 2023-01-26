import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import { TablePageGQL } from "@core/pages/client/pages/table/graphql";
import type { Observable } from "rxjs";
import { map } from "rxjs";

@Injectable({ providedIn: "root" })
export class TableResolver implements Resolve<any> {
	constructor(private _tablesPageGQL: TablePageGQL) {}

	resolve(): Observable<any> {
		return this._tablesPageGQL.watch().valueChanges.pipe(map((result) => result.data.table));
	}
}
