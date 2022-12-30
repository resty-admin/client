import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type PlacesQueryVariables = Types.Exact<Record<string, never>>;

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
	query Places {
		places {
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
