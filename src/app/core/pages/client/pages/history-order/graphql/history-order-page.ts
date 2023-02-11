import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type HistoryOrderPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface HistoryOrderPageQuery {
	__typename?: "Query";
	clientHistoryOrder: {
		__typename?: "HistoryOrderEntity";
		id: string;
		orderNumber: number;
		type: Types.OrderTypeEnum;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		users: any[];
		table?: any | null;
		productsToOrders: any[];
		place: {
			__typename?: "PlaceEntity";
			id: string;
			name: string;
			status: Types.PlaceStatusEnum;
			file?: { __typename?: "FileEntity"; id: string; url: string } | null;
		};
	};
}

export const HistoryOrderPageDocument = gql`
	query HistoryOrderPage($orderId: String!) {
		clientHistoryOrder(orderId: $orderId) {
			id
			orderNumber
			type
			status
			totalPrice
			users
			place {
				id
				name
				status
				file {
					id
					url
				}
			}
			table
			productsToOrders
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HistoryOrderPageGQL extends Apollo.Query<HistoryOrderPageQuery, HistoryOrderPageQueryVariables> {
	override document = HistoryOrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
