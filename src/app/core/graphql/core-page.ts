import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../graphql";
export type CorePageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface CorePageQuery {
	__typename?: "Query";
	order?: { __typename?: "ActiveOrderEntity"; type: Types.OrderTypeEnum; id: string; code: number } | null;
}

export const CorePageDocument = gql`
	query CorePage($orderId: String!) {
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
export class CorePageGQL extends Apollo.Query<CorePageQuery, CorePageQueryVariables> {
	override document = CorePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
