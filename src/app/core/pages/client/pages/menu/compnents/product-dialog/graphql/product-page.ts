import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../graphql";
export type ProductPageQueryVariables = Types.Exact<{
	productId: Types.Scalars["String"];
}>;

export interface ProductPageQuery {
	__typename?: "Query";
	product: {
		__typename?: "ProductEntity";
		id: string;
		name: string;
		price: number;
		description?: string | null;
		file?: { __typename?: "FileEntity"; id: string; url: string } | null;
		category: { __typename?: "CategoryEntity"; id: string; name: string };
		attrsGroups?:
			| {
					__typename?: "AttributesGroupEntity";
					id: string;
					name: string;
					attributes?: { __typename?: "AttributesEntity"; id: string; name: string; price: number }[] | null;
			  }[]
			| null;
	};
}

export const ProductPageDocument = gql`
	query ProductPage($productId: String!) {
		product(id: $productId) {
			id
			name
			price
			description
			file {
				id
				url
			}
			category {
				id
				name
			}
			attrsGroups {
				id
				name
				attributes {
					id
					name
					price
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductPageGQL extends Apollo.Query<ProductPageQuery, ProductPageQueryVariables> {
	override document = ProductPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
