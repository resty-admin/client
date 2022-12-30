import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CompaniesGQL } from "../../graphql/companies";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	readonly companies$ = this._companiesGQL.watch().valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(private readonly _companiesGQL: CompaniesGQL) {}

	async refetch() {
		await this._companiesGQL.watch().refetch();
	}
}
