import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CreateOrderMutationVariables = Types.Exact<{
	order: Types.CreateOrderInput;
}>;

export interface CreateOrderMutation {
	__typename?: "Mutation";
	createOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type UpdateOrderMutationVariables = Types.Exact<{
	order: Types.UpdateOrderInput;
}>;

export interface UpdateOrderMutation {
	__typename?: "Mutation";
	updateOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type DeleteOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface DeleteOrderMutation {
	__typename?: "Mutation";
	deleteOrder: string;
}

export type CloseOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface CloseOrderMutation {
	__typename?: "Mutation";
	closeOrder: string;
}

export type AddUserToOrderMutationVariables = Types.Exact<{
	code: Types.Scalars["Int"];
}>;

export interface AddUserToOrderMutation {
	__typename?: "Mutation";
	addUserToOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type AddTableToOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
	tableId: Types.Scalars["String"];
}>;

export interface AddTableToOrderMutation {
	__typename?: "Mutation";
	addTableToOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type RemoveTableFromOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface RemoveTableFromOrderMutation {
	__typename?: "Mutation";
	removeTableFromOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type ConfirmProductsToOrdersMutationVariables = Types.Exact<{
	productsToOrders: Types.ConfirmProductToOrderInput | Types.ConfirmProductToOrderInput[];
}>;

export interface ConfirmProductsToOrdersMutation {
	__typename?: "Mutation";
	confirmProductsToOrders: { __typename?: "ActiveOrderEntity"; id: string };
}

export type SetManualPayForProductsInOrderMutationVariables = Types.Exact<{
	productToOrderIds: Types.Scalars["String"] | Types.Scalars["String"][];
	manualPaymentType: Types.ManualPaymentEnum;
}>;

export interface SetManualPayForProductsInOrderMutation {
	__typename?: "Mutation";
	setManualPayForProductsInOrder: { __typename?: "ProductToOrderEntity"; id: string }[];
}

export type CreatePaymentOrderLinkMutationVariables = Types.Exact<{
	productsToOrders: Types.Scalars["String"] | Types.Scalars["String"][];
}>;

export interface CreatePaymentOrderLinkMutation {
	__typename?: "Mutation";
	createPaymentOrderLink: { __typename?: "FondyLink"; link: string };
}

export type CancelOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface CancelOrderMutation {
	__typename?: "Mutation";
	cancelOrder: string;
}

export const CreateOrderDocument = gql`
	mutation CreateOrder($order: CreateOrderInput!) {
		createOrder(order: $order) {
			id
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
export const UpdateOrderDocument = gql`
	mutation UpdateOrder($order: UpdateOrderInput!) {
		updateOrder(order: $order) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateOrderGQL extends Apollo.Mutation<UpdateOrderMutation, UpdateOrderMutationVariables> {
	override document = UpdateOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteOrderDocument = gql`
	mutation DeleteOrder($orderId: String!) {
		deleteOrder(orderId: $orderId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteOrderGQL extends Apollo.Mutation<DeleteOrderMutation, DeleteOrderMutationVariables> {
	override document = DeleteOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CloseOrderDocument = gql`
	mutation CloseOrder($orderId: String!) {
		closeOrder(orderId: $orderId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class CloseOrderGQL extends Apollo.Mutation<CloseOrderMutation, CloseOrderMutationVariables> {
	override document = CloseOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const AddUserToOrderDocument = gql`
	mutation AddUserToOrder($code: Int!) {
		addUserToOrder(code: $code) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AddUserToOrderGQL extends Apollo.Mutation<AddUserToOrderMutation, AddUserToOrderMutationVariables> {
	override document = AddUserToOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const AddTableToOrderDocument = gql`
	mutation AddTableToOrder($orderId: String!, $tableId: String!) {
		addTableToOrder(orderId: $orderId, tableId: $tableId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AddTableToOrderGQL extends Apollo.Mutation<AddTableToOrderMutation, AddTableToOrderMutationVariables> {
	override document = AddTableToOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const RemoveTableFromOrderDocument = gql`
	mutation RemoveTableFromOrder($orderId: String!) {
		removeTableFromOrder(orderId: $orderId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class RemoveTableFromOrderGQL extends Apollo.Mutation<
	RemoveTableFromOrderMutation,
	RemoveTableFromOrderMutationVariables
> {
	override document = RemoveTableFromOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ConfirmProductsToOrdersDocument = gql`
	mutation ConfirmProductsToOrders($productsToOrders: [ConfirmProductToOrderInput!]!) {
		confirmProductsToOrders(productsToOrders: $productsToOrders) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConfirmProductsToOrdersGQL extends Apollo.Mutation<
	ConfirmProductsToOrdersMutation,
	ConfirmProductsToOrdersMutationVariables
> {
	override document = ConfirmProductsToOrdersDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const SetManualPayForProductsInOrderDocument = gql`
	mutation SetManualPayForProductsInOrder($productToOrderIds: [String!]!, $manualPaymentType: ManualPaymentEnum!) {
		setManualPayForProductsInOrder(productToOrderIds: $productToOrderIds, manualPaymentType: $manualPaymentType) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SetManualPayForProductsInOrderGQL extends Apollo.Mutation<
	SetManualPayForProductsInOrderMutation,
	SetManualPayForProductsInOrderMutationVariables
> {
	override document = SetManualPayForProductsInOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreatePaymentOrderLinkDocument = gql`
	mutation CreatePaymentOrderLink($productsToOrders: [String!]!) {
		createPaymentOrderLink(productsToOrders: $productsToOrders) {
			link
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreatePaymentOrderLinkGQL extends Apollo.Mutation<
	CreatePaymentOrderLinkMutation,
	CreatePaymentOrderLinkMutationVariables
> {
	override document = CreatePaymentOrderLinkDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CancelOrderDocument = gql`
	mutation CancelOrder($orderId: String!) {
		cancelOrder(orderId: $orderId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class CancelOrderGQL extends Apollo.Mutation<CancelOrderMutation, CancelOrderMutationVariables> {
	override document = CancelOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
