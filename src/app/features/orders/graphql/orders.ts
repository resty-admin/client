import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type OrdersQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	skip: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface OrdersQuery {
	__typename?: "Query";
	orders: {
		__typename?: "PaginatedActiveOrder";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ActiveOrderEntity";
					code: number;
					id: string;
					totalPrice?: number | null;
					type: Types.OrderTypeEnum;
					place: { __typename?: "PlaceEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export type OrderQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface OrderQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		id: string;
		code: number;
		type: Types.OrderTypeEnum;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		users?: { __typename?: "UserEntity"; id: string; name: string }[] | null;
		usersToOrders?:
			| {
					__typename?: "UserToOrderEntity";
					id: string;
					count: number;
					product: {
						__typename?: "ProductEntity";
						id: string;
						name: string;
						price: number;
						description?: string | null;
					};
					user: { __typename?: "UserEntity"; id: string; name: string };
			  }[]
			| null;
		place: { __typename?: "PlaceEntity"; id: string; name: string };
		table?: { __typename?: "TableEntity"; id: string; name: string } | null;
	};
}

export type AddProductToOrderMutationVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
	product: Types.CreateUserToOrderInput;
}>;

export interface AddProductToOrderMutation {
	__typename?: "Mutation";
	addProductToOrder: { __typename?: "ActiveOrderEntity"; id: string };
}

export type AddUserToOrderMutationVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
	code: Types.Scalars["Int"];
}>;

export interface AddUserToOrderMutation {
	__typename?: "Mutation";
	addUserToOrder: { __typename?: "ActiveOrderEntity"; code: number; id: string };
}

export type UpdateOrderMutationVariables = Types.Exact<{
	order: Types.UpdateOrderInput;
}>;

export interface UpdateOrderMutation {
	__typename?: "Mutation";
	updateOrder: {
		__typename?: "ActiveOrderEntity";
		id: string;
		code: number;
		status: Types.OrderStatusEnum;
		type: Types.OrderTypeEnum;
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
		code: number;
		type: Types.OrderTypeEnum;
		status: Types.OrderStatusEnum;
		totalPrice?: number | null;
		table?: { __typename?: "TableEntity"; id: string; name: string } | null;
		place: { __typename?: "PlaceEntity"; id: string; name: string };
	};
}

export const OrdersDocument = gql`
	query Orders($take: Int!, $skip: Int!, $filtersArgs: FiltersArgsDto) {
		orders(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				code
				id
				totalPrice
				type
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
export class OrdersGQL extends Apollo.Query<OrdersQuery, OrdersQueryVariables> {
	override document = OrdersDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const OrderDocument = gql`
	query Order($orderId: String!) {
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
			usersToOrders {
				id
				count
				product {
					id
					name
					price
					description
				}
				user {
					id
					name
				}
			}
			place {
				id
				name
			}
			table {
				id
				name
			}
			place {
				id
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
export const AddProductToOrderDocument = gql`
	mutation AddProductToOrder($orderId: String!, $product: CreateUserToOrderInput!) {
		addProductToOrder(orderId: $orderId, product: $product) {
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
export const AddUserToOrderDocument = gql`
	mutation AddUserToOrder($placeId: String!, $code: Int!) {
		addUserToOrder(placeId: $placeId, code: $code) {
			code
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
export const UpdateOrderDocument = gql`
	mutation UpdateOrder($order: UpdateOrderInput!) {
		updateOrder(order: $order) {
			id
			code
			status
			type
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
export const CreateOrderDocument = gql`
	mutation CreateOrder($order: CreateOrderInput!) {
		createOrder(order: $order) {
			id
			code
			type
			status
			totalPrice
			table {
				id
				name
			}
			place {
				id
				name
			}
			place {
				id
			}
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
