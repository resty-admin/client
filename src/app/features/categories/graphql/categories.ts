import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CategoriesQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface CategoriesQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "CategoryEntity";
					id: string;
					name: string;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export const CategoriesDocument = gql`
	query Categories($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				file {
					id
					url
				}
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CategoriesGQL extends Apollo.Query<CategoriesQuery, CategoriesQueryVariables> {
	override document = CategoriesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
