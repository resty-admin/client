import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type OrdersQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	skip: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface OrdersQuery {
	__typename?: "Query";
	orders: {
		__typename?: "PaginatedActiveOrder";
		page: number;
		totalCount: number;
		data?: { __typename?: "ActiveOrderEntity"; orderCode: string; id: string }[] | null;
	};
}

export const OrdersDocument = gql`
	query Orders($take: Int!, $skip: Int!, $filtersArgs: FiltersArgsDto) {
		orders(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				orderCode
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class OrdersGQL extends Apollo.Query<OrdersQuery, OrdersQueryVariables> {
	override document = OrdersDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
