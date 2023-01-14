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
			  }[]
			| null;
	};
}

export type ProductsPageOrderQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ProductsPageOrderQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		id: string;
		usersToOrders?:
			| {
					__typename?: "UserToOrderEntity";
					id: string;
					count: number;
					user: { __typename?: "UserEntity"; id: string };
					product: { __typename?: "ProductEntity"; id: string; name: string; price: number };
					attributes?: { __typename?: "AttributesEntity"; id: string; name: string; price: number }[] | null;
			  }[]
			| null;
	};
}

export const ProductsPageDocument = gql`
	query ProductsPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		products(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				name
				description
				price
			}
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
export const ProductsPageOrderDocument = gql`
	query ProductsPageOrder($orderId: String!) {
		order(id: $orderId) {
			id
			usersToOrders {
				id
				count
				user {
					id
				}
				product {
					id
					name
					price
				}
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
export class ProductsPageOrderGQL extends Apollo.Query<ProductsPageOrderQuery, ProductsPageOrderQueryVariables> {
	override document = ProductsPageOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
