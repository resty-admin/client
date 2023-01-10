import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type CategoriesPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface CategoriesPageQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?: { __typename?: "CategoryEntity"; id: string; name: string }[] | null;
	};
}

export const CategoriesPageDocument = gql`
	query CategoriesPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CategoriesPageGQL extends Apollo.Query<CategoriesPageQuery, CategoriesPageQueryVariables> {
	override document = CategoriesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
