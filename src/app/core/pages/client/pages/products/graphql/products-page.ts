import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ProductsPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ProductsPageQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ProductEntity";
					id: string;
					name: string;
					description?: string | null;
					price: number;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export const ProductsPageDocument = gql`
	query ProductsPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
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
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductsPageGQL extends Apollo.Query<ProductsPageQuery, ProductsPageQueryVariables> {
	override document = ProductsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
