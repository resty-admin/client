import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type PlacesQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	skip: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface PlacesQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		totalCount: number;
		page: number;
		data?: { __typename?: "PlaceEntity"; name: string; id: string; status: Types.PlaceStatusEnum }[] | null;
	};
}

export const PlacesDocument = gql`
	query Places($take: Int!, $skip: Int!, $filtersArgs: FiltersArgsDto) {
		places(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
			data {
				name
				id
				name
				status
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class PlacesGQL extends Apollo.Query<PlacesQuery, PlacesQueryVariables> {
	override document = PlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
