import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ConfirmProductsPageQueryVariables = Types.Exact<Record<string, never>>;

export interface ConfirmProductsPageQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		data?:
			| {
					__typename?: "ProductEntity";
					id: string;
					name: string;
					price: number;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export const ConfirmProductsPageDocument = gql`
	query ConfirmProductsPage {
		products {
			data {
				id
				name
				price
				file {
					id
					url
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
