import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../graphql";
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

export type IsTableAvailableForReserveQueryVariables = Types.Exact<{
	body: Types.IsTableAvailableInput;
}>;

export interface IsTableAvailableForReserveQuery {
	__typename?: "Query";
	isTableAvailableForReserve: { __typename?: "TableEntity"; id: string };
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
export const IsTableAvailableForReserveDocument = gql`
	query IsTableAvailableForReserve($body: IsTableAvailableInput!) {
		isTableAvailableForReserve(body: $body) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class IsTableAvailableForReserveGQL extends Apollo.Query<
	IsTableAvailableForReserveQuery,
	IsTableAvailableForReserveQueryVariables
> {
	override document = IsTableAvailableForReserveDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
