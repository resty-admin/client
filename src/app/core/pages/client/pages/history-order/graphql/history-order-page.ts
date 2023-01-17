import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type HistoryOrderPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface HistoryOrderPageQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		id: string;
		code: number;
		type: Types.OrderTypeEnum;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		users?: { __typename?: "UserEntity"; id: string; name: string }[] | null;
		place: {
			__typename?: "PlaceEntity";
			id: string;
			name: string;
			file?: { __typename?: "FileEntity"; id: string; url: string } | null;
		};
		table?: {
			__typename?: "TableEntity";
			id: string;
			name: string;
			file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			hall: { __typename?: "HallEntity"; id: string; name: string };
		} | null;
		productsToOrders?:
			| {
					__typename?: "ProductToOrderEntity";
					id: string;
					count: number;
					status: Types.ProductToOrderStatusEnum;
					paidStatus: Types.ProductToOrderPaidStatusEnum;
					user: { __typename?: "UserEntity"; id: string; name: string };
					product: {
						__typename?: "ProductEntity";
						id: string;
						name: string;
						description?: string | null;
						price: number;
						file?: { __typename?: "FileEntity"; id: string; url: string } | null;
						attrsGroups?:
							| {
									__typename?: "AttributesGroupEntity";
									id: string;
									name: string;
									type: Types.AttributeGroupTypeEnum;
									maxItemsForPick: number;
									attributes?: { __typename?: "AttributesEntity"; id: string; name: string; price: number }[] | null;
							  }[]
							| null;
					};
			  }[]
			| null;
	};
}

export const HistoryOrderPageDocument = gql`
	query HistoryOrderPage($orderId: String!) {
		order(id: $orderId) {
			id
			code
			type
			status
			totalPrice
			users {
				id
				name
			}
			place {
				id
				name
				file {
					id
					url
				}
			}
			table {
				id
				name
				file {
					id
					url
				}
				hall {
					id
					name
				}
			}
			productsToOrders {
				id
				count
				status
				paidStatus
				user {
					id
					name
				}
				product {
					id
					name
					description
					price
					file {
						id
						url
					}
					attrsGroups {
						id
						name
						type
						maxItemsForPick
						attributes {
							id
							name
							price
						}
					}
				}
			}
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
