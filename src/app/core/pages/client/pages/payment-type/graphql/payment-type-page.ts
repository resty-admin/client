import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type PaymentTypePageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface PaymentTypePageQuery {
	__typename?: "Query";
	order: { __typename?: "ActiveOrderEntity"; id: string; totalPrice?: number | null };
}

export const PaymentTypePageDocument = gql`
	query PaymentTypePage($orderId: String!) {
		order(id: $orderId) {
			id
			totalPrice
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
