import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type HistoryOrdersPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface HistoryOrdersPageQuery {
	__typename?: "Query";
	clientHistoryOrders: {
		__typename?: "PaginatedHistoryOrder";
		data?:
			| {
					__typename?: "HistoryOrderEntity";
					id: string;
					totalPrice?: number | null;
					type: Types.OrderTypeEnum;
					orderNumber: number;
					startDate?: any | null;
					place: { __typename?: "PlaceEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export const HistoryOrdersPageDocument = gql`
	query HistoryOrdersPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		clientHistoryOrders(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				totalPrice
				type
				orderNumber
				startDate
				place {
					id
					name
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HistoryOrdersPageGQL extends Apollo.Query<HistoryOrdersPageQuery, HistoryOrdersPageQueryVariables> {
	override document = HistoryOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
