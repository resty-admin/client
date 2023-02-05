import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type PaymentStatusPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface PaymentStatusPageQuery {
	__typename?: "Query";
	order?: {
		__typename?: "ActiveOrderEntity";
		id: string;
		code: number;
		type: Types.OrderTypeEnum;
		productsToOrders?:
			| {
					__typename?: "ProductToOrderEntity";
					id: string;
					paidStatus: Types.ProductToOrderPaidStatusEnum;
					count: number;
					product: { __typename?: "ProductEntity"; id: string; price: number };
					attributesToProduct?:
						| {
								__typename?: "AttributeToProductEntity";
								id: string;
								attribute: { __typename?: "AttributesEntity"; id: string; price: number };
						  }[]
						| null;
			  }[]
			| null;
	} | null;
}

export const PaymentStatusPageDocument = gql`
	query PaymentStatusPage($orderId: String!) {
		order(id: $orderId) {
			id
			code
			type
			productsToOrders {
				id
				paidStatus
				product {
					id
					price
				}
				attributesToProduct {
					id
					attribute {
						id
						price
					}
				}
				count
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class PaymentStatusPageGQL extends Apollo.Query<PaymentStatusPageQuery, PaymentStatusPageQueryVariables> {
	override document = PaymentStatusPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
