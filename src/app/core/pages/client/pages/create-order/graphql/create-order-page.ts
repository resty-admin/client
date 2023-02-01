import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type CreateOrderPageQueryVariables = Types.Exact<{
	orderId?: Types.InputMaybe<Types.Scalars["String"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface CreateOrderPageQuery {
	__typename?: "Query";
	order?: { __typename?: "ActiveOrderEntity"; id: string; code: number; type: Types.OrderTypeEnum } | null;
}

export const CreateOrderPageDocument = gql`
	query CreateOrderPage($orderId: String, $filtersArgs: [FiltersArgsDto!]) {
		order(id: $orderId, filtersArgs: $filtersArgs) {
			id
			code
			type
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateOrderPageGQL extends Apollo.Query<CreateOrderPageQuery, CreateOrderPageQueryVariables> {
	override document = CreateOrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
