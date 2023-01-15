import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type MenuPageCategoriesQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface MenuPageCategoriesQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?: { __typename?: "CategoryEntity"; id: string; name: string }[] | null;
	};
}

export type MenuPageProductsQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface MenuPageProductsQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		page: number;
		totalCount: number;
		data?: { __typename?: "ProductEntity"; id: string; name: string; price: number }[] | null;
	};
}

export type MenuPageOrderQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface MenuPageOrderQuery {
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

export const MenuPageCategoriesDocument = gql`
	query MenuPageCategories($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class MenuPageCategoriesGQL extends Apollo.Query<MenuPageCategoriesQuery, MenuPageCategoriesQueryVariables> {
	override document = MenuPageCategoriesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const MenuPageProductsDocument = gql`
	query MenuPageProducts($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		products(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				price
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class MenuPageProductsGQL extends Apollo.Query<MenuPageProductsQuery, MenuPageProductsQueryVariables> {
	override document = MenuPageProductsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const MenuPageOrderDocument = gql`
	query MenuPageOrder($orderId: String!) {
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
export class MenuPageOrderGQL extends Apollo.Query<MenuPageOrderQuery, MenuPageOrderQueryVariables> {
	override document = MenuPageOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
