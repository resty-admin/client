import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type TablesPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface TablesPageQuery {
	__typename?: "Query";
	tables: {
		__typename?: "PaginatedTable";
		page: number;
		totalCount: number;
		data?: { __typename?: "TableEntity"; id: string; name: string }[] | null;
	};
}

export const TablesPageDocument = gql`
	query TablesPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		tables(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
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
export class TablesPageGQL extends Apollo.Query<TablesPageQuery, TablesPageQueryVariables> {
	override document = TablesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
