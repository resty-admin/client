import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type OrderQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface OrderQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		id: string;
		orderCode: string;
		type: Types.OrderTypeEnum;
		status: Types.OrderStatusEnum;
		totalPrice: number;
		table?: { __typename?: "TableEntity"; name: string } | null;
	};
}

export type CreateOrderMutationVariables = Types.Exact<{
	order: Types.CreateOrderInput;
}>;

export interface CreateOrderMutation {
	__typename?: "Mutation";
	createOrder: {
		__typename?: "ActiveOrderEntity";
		id: string;
		orderCode: string;
		status: Types.OrderStatusEnum;
		type: Types.OrderTypeEnum;
	};
}

export const OrderDocument = gql`
	query Order($orderId: String!) {
		order(id: $orderId) {
			id
			orderCode
			type
			status
			totalPrice
			table {
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class OrderGQL extends Apollo.Query<OrderQuery, OrderQueryVariables> {
	override document = OrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateOrderDocument = gql`
	mutation CreateOrder($order: CreateOrderInput!) {
		createOrder(order: $order) {
			id
			orderCode
			status
			type
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateOrderGQL extends Apollo.Mutation<CreateOrderMutation, CreateOrderMutationVariables> {
	override document = CreateOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
