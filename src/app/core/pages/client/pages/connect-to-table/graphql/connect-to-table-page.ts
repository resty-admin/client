import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type ConnectToTablePageMutationVariables = Types.Exact<{
	code: Types.Scalars["String"];
	placeId: Types.Scalars["String"];
}>;

export interface ConnectToTablePageMutation {
	__typename?: "Mutation";
	getTableByCode: { __typename?: "TableEntity"; id: string };
}

export const ConnectToTablePageDocument = gql`
	mutation ConnectToTablePage($code: String!, $placeId: String!) {
		getTableByCode(code: $code, placeId: $placeId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConnectToTablePageGQL extends Apollo.Mutation<
	ConnectToTablePageMutation,
	ConnectToTablePageMutationVariables
> {
	override document = ConnectToTablePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
