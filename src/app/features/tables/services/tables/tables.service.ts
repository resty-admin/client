import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { TableGQL, TablesGQL } from "../../graphql/tables";

@Injectable({ providedIn: "root" })
export class TablesService {
	private readonly _tablesQuery = this._tablesGQL.watch({ skip: 0, take: 5 });

	readonly tables$ = this._tablesQuery.valueChanges.pipe(map((result) => result.data.tables.data));

	constructor(private readonly _tablesGQL: TablesGQL, private readonly _tableGQL: TableGQL) {}

	getTable(tableId: string) {
		return this._tableGQL.watch({ tableId }).valueChanges.pipe(map((result) => result.data.table));
	}
}
