import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type HallsPageQueryVariables = Types.Exact<{
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface HallsPageQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
}

export const HallsPageDocument = gql`
	query HallsPage($take: Int, $skip: Int, $filtersArgs: [FiltersArgsDto!]) {
		halls(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
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
export class HallsPageGQL extends Apollo.Query<HallsPageQuery, HallsPageQueryVariables> {
	override document = HallsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
