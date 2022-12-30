import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type HallsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface HallsQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "HallEntity";
					tables?:
						| {
								__typename?: "TableEntity";
								id: string;
								hall: {
									__typename?: "HallEntity";
									id: string;
									name: string;
									file?: { __typename?: "FileEntity"; id: string; url: string } | null;
								};
						  }[]
						| null;
			  }[]
			| null;
	};
}

export const HallsDocument = gql`
	query Halls($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		halls(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				tables {
					id
					hall {
						id
						file {
							id
							url
						}
						name
					}
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HallsGQL extends Apollo.Query<HallsQuery, HallsQueryVariables> {
	override document = HallsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
