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

export type TablePageOrderQueryVariables = Types.Exact<{
	orderId?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export interface TablePageOrderQuery {
	__typename?: "Query";
	order?: { __typename?: "ActiveOrderEntity"; startDate: any } | null;
}

export type IsTableAvailableForReserveQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
	date: Types.Scalars["DateTime"];
}>;

export interface IsTableAvailableForReserveQuery {
	__typename?: "Query";
	isTableAvailableForReserve: { __typename?: "TableEntity"; id: string };
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
export const TablePageOrderDocument = gql`
	query TablePageOrder($orderId: String) {
		order(id: $orderId) {
			startDate
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TablePageOrderGQL extends Apollo.Query<TablePageOrderQuery, TablePageOrderQueryVariables> {
	override document = TablePageOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const IsTableAvailableForReserveDocument = gql`
	query IsTableAvailableForReserve($tableId: String!, $date: DateTime!) {
		isTableAvailableForReserve(tableId: $tableId, date: $date) {
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
