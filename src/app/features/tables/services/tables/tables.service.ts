import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { TableGQL } from "../../graphql/table";
import { TablesGQL } from "../../graphql/tables";

@Injectable({ providedIn: "root" })
export class TablesService {
	readonly tables$ = this._tablesGQL.watch().valueChanges.pipe(map((result) => result.data.tables.data));

	constructor(private readonly _tablesGQL: TablesGQL, private readonly _tableGQL: TableGQL) {}

	getTable(tableId: string) {
		this._tableGQL.watch().setVariables({ tableId });

		return this._tableGQL.watch().valueChanges.pipe(map((result) => result.data.table));
	}

	async refetch() {
		await this._tablesGQL.watch().refetch();
	}
}
