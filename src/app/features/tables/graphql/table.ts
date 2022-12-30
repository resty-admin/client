import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type TableQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface TableQuery {
	__typename?: "Query";
	table: { __typename?: "TableEntity"; code: number; id: string; name: string };
}

export const TableDocument = gql`
	query Table($tableId: String!) {
		table(id: $tableId) {
			code
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TableGQL extends Apollo.Query<TableQuery, TableQueryVariables> {
	override document = TableDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
