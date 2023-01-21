import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type AllOrdersPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface AllOrdersPageQuery {
	__typename?: "Query";
	historyOrders: {
		__typename?: "PaginatedHistoryOrder";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "HistoryOrderEntity";
					id: string;
					totalPrice?: number | null;
					type: Types.OrderTypeEnum;
					orderNumber: number;
					place: { __typename?: "PlaceEntity"; id: string; name: string };
			  }[]
			| null;
	};
	orders: {
		__typename?: "PaginatedActiveOrder";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ActiveOrderEntity";
					id: string;
					code: number;
					totalPrice?: number | null;
					type: Types.OrderTypeEnum;
					place: { __typename?: "PlaceEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export const AllOrdersPageDocument = gql`
	query AllOrdersPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		historyOrders(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				totalPrice
				type
				orderNumber
				place {
					id
					name
				}
			}
			page
			totalCount
		}
		orders(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				code
				totalPrice
				type
				place {
					id
					name
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
export class AllOrdersPageGQL extends Apollo.Query<AllOrdersPageQuery, AllOrdersPageQueryVariables> {
	override document = AllOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
