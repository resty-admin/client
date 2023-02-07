import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ConfirmProductsPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ConfirmProductsPageQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		data?:
			| {
					__typename?: "ProductEntity";
					id: string;
					name: string;
					description?: string | null;
					price: number;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
					attrsGroups?:
						| {
								__typename?: "AttributesGroupEntity";
								id: string;
								name: string;
								type: Types.AttributeGroupTypeEnum;
								maxItemsForPick: number;
								attributes?: { __typename?: "AttributesEntity"; id: string; name: string; price: number }[] | null;
						  }[]
						| null;
			  }[]
			| null;
	};
}

export const ConfirmProductsPageDocument = gql`
	query ConfirmProductsPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		products(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				description
				price
				file {
					id
					url
				}
				attrsGroups {
					id
					name
					type
					maxItemsForPick
					attributes {
						id
						name
						price
					}
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConfirmProductsPageGQL extends Apollo.Query<ConfirmProductsPageQuery, ConfirmProductsPageQueryVariables> {
	override document = ConfirmProductsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
