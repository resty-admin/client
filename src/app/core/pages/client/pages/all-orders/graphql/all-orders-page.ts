import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type AllOrdersPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface AllOrdersPageQuery {
	__typename?: "Query";
	historyOrders: {
		__typename?: "PaginatedHistoryOrder";
		page: number;
		totalCount: number;
		data?: { __typename?: "HistoryOrderEntity"; id: string }[] | null;
	};
}

export const AllOrdersPageDocument = gql`
	query AllOrdersPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		historyOrders(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AllOrdersPageGQL extends Apollo.Query<AllOrdersPageQuery, AllOrdersPageQueryVariables> {
	override document = AllOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
