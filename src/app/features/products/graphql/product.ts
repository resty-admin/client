import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ProductQueryVariables = Types.Exact<{
	productId: Types.Scalars["String"];
}>;

export interface ProductQuery {
	__typename?: "Query";
	product: {
		__typename?: "ProductEntity";
		description?: string | null;
		name: string;
		price: number;
		id: string;
		attrsGroups?:
			| {
					__typename?: "AttributesGroupEntity";
					name: string;
					isUniq?: boolean | null;
					attributes?: { __typename?: "AttributesEntity"; id: string; name: string }[] | null;
			  }[]
			| null;
		file?: { __typename?: "FileEntity"; url: string; id: string } | null;
	};
}

export const ProductDocument = gql`
	query Product($productId: String!) {
		product(id: $productId) {
			description
			name
			price
			id
			attrsGroups {
				name
				isUniq
				attributes {
					id
					name
				}
			}
			file {
				url
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductGQL extends Apollo.Query<ProductQuery, ProductQueryVariables> {
	override document = ProductDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
