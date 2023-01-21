import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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

export type AddProductToOrderMutationVariables = Types.Exact<{
	productToOrder: Types.AddProductToOrderInput;
}>;

export interface AddProductToOrderMutation {
	__typename?: "Mutation";
	addProductToOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type RemoveProductFromOrderMutationVariables = Types.Exact<{
	productFromOrder: Types.RemoveProductFromOrderInput;
}>;

export interface RemoveProductFromOrderMutation {
	__typename?: "Mutation";
	removeProductFromOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type ConfirmOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ConfirmOrderMutation {
	__typename?: "Mutation";
	confirmOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type SetManualPayForProductsInOrderMutationVariables = Types.Exact<{
	productToOrderIds: Types.Scalars["String"] | Types.Scalars["String"][];
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
export const AddProductToOrderDocument = gql`
	mutation AddProductToOrder($productToOrder: AddProductToOrderInput!) {
		addProductToOrder(productToOrder: $productToOrder) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AddProductToOrderGQL extends Apollo.Mutation<
	AddProductToOrderMutation,
	AddProductToOrderMutationVariables
> {
	override document = AddProductToOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const RemoveProductFromOrderDocument = gql`
	mutation RemoveProductFromOrder($productFromOrder: RemoveProductFromOrderInput!) {
		removeProductFromOrder(productFromOrder: $productFromOrder) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class RemoveProductFromOrderGQL extends Apollo.Mutation<
	RemoveProductFromOrderMutation,
	RemoveProductFromOrderMutationVariables
> {
	override document = RemoveProductFromOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ConfirmOrderDocument = gql`
	mutation ConfirmOrder($orderId: String!) {
		confirmOrder(orderId: $orderId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConfirmOrderGQL extends Apollo.Mutation<ConfirmOrderMutation, ConfirmOrderMutationVariables> {
	override document = ConfirmOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const SetManualPayForProductsInOrderDocument = gql`
	mutation SetManualPayForProductsInOrder($productToOrderIds: [String!]!) {
		setManualPayForProductsInOrder(productToOrderIds: $productToOrderIds) {
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
