import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ActiveOrderPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ActiveOrderPageQuery {
	__typename?: "Query";
	order?: {
		__typename?: "ActiveOrderEntity";
		id: string;
		code: number;
		type: Types.OrderTypeEnum;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		tableStatus: Types.TableStatusEnum;
		startDate: any;
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
					attributesToProduct?:
						| {
								__typename?: "AttributeToProductEntity";
								id: string;
								attribute: {
									__typename?: "AttributesEntity";
									id: string;
									name: string;
									attributesGroup?: { __typename?: "AttributesGroupEntity"; id: string; name: string }[] | null;
								};
						  }[]
						| null;
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
	} | null;
}

export const ActiveOrderPageDocument = gql`
	query ActiveOrderPage($orderId: String!) {
		order(id: $orderId) {
			id
			code
			type
			status
			totalPrice
			tableStatus
			startDate
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
				attributesToProduct {
					id
					attribute {
						id
						name
						attributesGroup {
							id
							name
						}
					}
				}
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
export class ActiveOrderPageGQL extends Apollo.Query<ActiveOrderPageQuery, ActiveOrderPageQueryVariables> {
	override document = ActiveOrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
