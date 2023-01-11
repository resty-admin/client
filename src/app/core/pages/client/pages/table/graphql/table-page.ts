import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type TablePageQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface TablePageQuery {
	__typename?: "Query";
	table: {
		__typename?: "TableEntity";
		id: string;
		name: string;
		code: number;
		file?: { __typename?: "FileEntity"; id: string; url: string } | null;
	};
}

export const TablePageDocument = gql`
	query TablePage($tableId: String!) {
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
export class TablePageGQL extends Apollo.Query<TablePageQuery, TablePageQueryVariables> {
	override document = TablePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
