import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AccountingSystemsGQL } from "../../graphql/accounting-systems";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	private readonly _accountingSystemsQuery = this._accountingSystemsGQL.watch();
	readonly accountingSystems$ = this._accountingSystemsQuery.valueChanges.pipe(
		map((result) => result.data.accountingSystems.data)
	);

	constructor(private readonly _accountingSystemsGQL: AccountingSystemsGQL) {}
}
