import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ConfirmProductsPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ConfirmProductsPageQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		id: string;
		place: { __typename?: "PlaceEntity"; id: string };
		productsToOrders?:
			| {
					__typename?: "ProductToOrderEntity";
					count: number;
					status: Types.ProductToOrderStatusEnum;
					user: { __typename?: "UserEntity"; id: string };
					product: {
						__typename?: "ProductEntity";
						id: string;
						name: string;
						description?: string | null;
						price: number;
					};
					attributes?: { __typename?: "AttributesEntity"; id: string; name: string; price: number }[] | null;
			  }[]
			| null;
	};
}

export const ConfirmProductsPageDocument = gql`
	query ConfirmProductsPage($orderId: String!) {
		order(id: $orderId) {
			id
			place {
				id
			}
			productsToOrders {
				count
				status
				user {
					id
				}
				product {
					id
					name
					description
					price
				}
				attributes {
					id
					name
					price
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConfirmProductsPageGQL extends Apollo.Query<ConfirmProductsPageQuery, ConfirmProductsPageQueryVariables> {
	override document = ConfirmProductsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
