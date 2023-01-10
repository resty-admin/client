import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CompaniesQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	skip: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface CompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?: { __typename?: "CompanyEntity"; name: string }[] | null;
	};
}

export const CompaniesDocument = gql`
	query Companies($take: Int!, $skip: Int!, $filtersArgs: [FiltersArgsDto!]) {
		companies(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
			data {
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CompaniesGQL extends Apollo.Query<CompaniesQuery, CompaniesQueryVariables> {
	override document = CompaniesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
