import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ConnectToTablePageQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface ConnectToTablePageQuery {
	__typename?: "Query";
	table: { __typename?: "TableEntity"; id: string };
}

export const ConnectToTablePageDocument = gql`
	query ConnectToTablePage($tableId: String!) {
		table(id: $tableId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConnectToTablePageGQL extends Apollo.Query<ConnectToTablePageQuery, ConnectToTablePageQueryVariables> {
	override document = ConnectToTablePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
