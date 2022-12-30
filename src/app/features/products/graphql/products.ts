import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ProductsQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
	skip: Types.Scalars["Int"];
}>;

export interface ProductsQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ProductEntity";
					price: number;
					name: string;
					id: string;
					description?: string | null;
					file?: { __typename?: "FileEntity"; url: string; id: string } | null;
			  }[]
			| null;
	};
}

export const ProductsDocument = gql`
	query Products($take: Int!, $filtersArgs: FiltersArgsDto, $skip: Int!) {
		products(take: $take, filtersArgs: $filtersArgs, skip: $skip) {
			page
			totalCount
			data {
				price
				name
				id
				description
				file {
					url
					id
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductsGQL extends Apollo.Query<ProductsQuery, ProductsQueryVariables> {
	override document = ProductsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
