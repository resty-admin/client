import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../graphql";
export type TableDialogQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface TableDialogQuery {
	__typename?: "Query";
	table: {
		__typename?: "TableEntity";
		id: string;
		name: string;
		code: number;
		file?: { __typename?: "FileEntity"; id: string; url: string } | null;
	};
}

export const TableDialogDocument = gql`
	query TableDialog($tableId: String!) {
		table(id: $tableId) {
			id
			name
			code
			file {
				id
				url
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TableDialogGQL extends Apollo.Query<TableDialogQuery, TableDialogQueryVariables> {
	override document = TableDialogDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
