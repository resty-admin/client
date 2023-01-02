import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type AttributeGroupsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface AttributeGroupsQuery {
	__typename?: "Query";
	attributeGroups: {
		__typename?: "PaginatedAttributeGroups";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "AttributesGroupEntity";
					id: string;
					type: Types.AttributeGroupTypeEnum;
					maxItemsForPick: number;
					name: string;
					attributes?: { __typename?: "AttributesEntity"; name: string }[] | null;
			  }[]
			| null;
	};
}

export const AttributeGroupsDocument = gql`
	query AttributeGroups($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		attributeGroups(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				type
				maxItemsForPick
				name
				attributes {
					name
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AttributeGroupsGQL extends Apollo.Query<AttributeGroupsQuery, AttributeGroupsQueryVariables> {
	override document = AttributeGroupsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
