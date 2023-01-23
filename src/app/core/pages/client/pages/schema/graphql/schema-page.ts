import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type SchemaPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface SchemaPageQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "HallEntity";
					id: string;
					name: string;
					tables?:
						| {
								__typename?: "TableEntity";
								id: string;
								name: string;
								file?: { __typename?: "FileEntity"; id: string; url: string } | null;
						  }[]
						| null;
			  }[]
			| null;
	};
}

export const SchemaPageDocument = gql`
	query SchemaPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		halls(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				tables {
					id
					name
					file {
						id
						url
					}
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
export class SchemaPageGQL extends Apollo.Query<SchemaPageQuery, SchemaPageQueryVariables> {
	override document = SchemaPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
