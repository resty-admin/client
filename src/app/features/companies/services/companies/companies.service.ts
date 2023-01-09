import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CompaniesGQL } from "../../graphql/companies";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	private readonly _companiesQuery = this._companiesGQL.watch({ skip: 0, take: 5 });

	readonly companies$ = this._companiesQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(private readonly _companiesGQL: CompaniesGQL) {}
}
