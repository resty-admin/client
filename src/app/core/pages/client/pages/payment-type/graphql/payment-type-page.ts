import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type PaymentTypePageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface PaymentTypePageQuery {
	__typename?: "Query";
	order?: {
		__typename?: "ActiveOrderEntity";
		id: string;
		productsToOrders?:
			| {
					__typename?: "ProductToOrderEntity";
					id: string;
					count: number;
					product: { __typename?: "ProductEntity"; id: string; price: number };
					attributesToProduct?:
						| {
								__typename?: "AttributeToProductEntity";
								id: string;
								count: number;
								attribute: { __typename?: "AttributesEntity"; id: string; price: number };
						  }[]
						| null;
			  }[]
			| null;
	} | null;
}

export const PaymentTypePageDocument = gql`
	query PaymentTypePage($orderId: String!) {
		order(id: $orderId) {
			id
			productsToOrders {
				id
				product {
					id
					price
				}
				attributesToProduct {
					id
					count
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
export class PaymentTypePageGQL extends Apollo.Query<PaymentTypePageQuery, PaymentTypePageQueryVariables> {
	override document = PaymentTypePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
