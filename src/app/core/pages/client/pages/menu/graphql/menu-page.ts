import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type MenuPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface MenuPageQuery {
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
					products?:
						| {
								__typename?: "ProductEntity";
								id: string;
								name: string;
								description?: string | null;
								price: number;
								file?: { __typename?: "FileEntity"; id: string; url: string } | null;
						  }[]
						| null;
			  }[]
			| null;
	};
}

export const MenuPageDocument = gql`
	query MenuPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				products {
					id
					name
					description
					price
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
export class MenuPageGQL extends Apollo.Query<MenuPageQuery, MenuPageQueryVariables> {
	override document = MenuPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
