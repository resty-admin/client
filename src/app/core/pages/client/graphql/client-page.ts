import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type ClientPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ClientPageQuery {
	__typename?: "Query";
	order?: { __typename?: "ActiveOrderEntity"; type: Types.OrderTypeEnum; id: string; code: number } | null;
}

export const ClientPageDocument = gql`
	query ClientPage($orderId: String!) {
		order(id: $orderId) {
			type
			id
			code
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ClientPageGQL extends Apollo.Query<ClientPageQuery, ClientPageQueryVariables> {
	override document = ClientPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
