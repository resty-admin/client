import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type AttributesQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface AttributesQuery {
	__typename?: "Query";
	attributes: {
		__typename?: "PaginatedAttributes";
		page: number;
		totalCount: number;
		data?: { __typename?: "AttributesEntity"; price?: number | null; name: string; id: string }[] | null;
	};
}

export const AttributesDocument = gql`
	query Attributes($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		attributes(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				price
				name
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AttributesGQL extends Apollo.Query<AttributesQuery, AttributesQueryVariables> {
	override document = AttributesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
