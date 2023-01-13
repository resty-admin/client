import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ProductsErrorPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ProductsErrorPageQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		page: number;
		totalCount: number;
		data?: { __typename?: "ProductEntity"; id: string; name: string; price: number }[] | null;
	};
}

export const ProductsErrorPageDocument = gql`
	query ProductsErrorPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		products(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				name
				price
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductsErrorPageGQL extends Apollo.Query<ProductsErrorPageQuery, ProductsErrorPageQueryVariables> {
	override document = ProductsErrorPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
