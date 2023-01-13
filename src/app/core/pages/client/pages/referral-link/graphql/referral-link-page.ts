import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ReferralLinkPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface ReferralLinkPageQuery {
	__typename?: "Query";
	order: {
		__typename?: "ActiveOrderEntity";
		type: Types.OrderTypeEnum;
		code: number;
		place: { __typename?: "PlaceEntity"; id: string };
	};
}

export const ReferralLinkPageDocument = gql`
	query ReferralLinkPage($orderId: String!) {
		order(id: $orderId) {
			type
			code
			place {
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ReferralLinkPageGQL extends Apollo.Query<ReferralLinkPageQuery, ReferralLinkPageQueryVariables> {
	override document = ReferralLinkPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
