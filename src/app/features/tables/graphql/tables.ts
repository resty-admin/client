import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type TablesQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface TablesQuery {
	__typename?: "Query";
	tables: {
		__typename?: "PaginatedTable";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "TableEntity";
					id: string;
					name: string;
					code: number;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export type TableQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface TableQuery {
	__typename?: "Query";
	table: {
		__typename?: "TableEntity";
		code: number;
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; id: string; url: string } | null;
	};
}

export const TablesDocument = gql`
	query Tables($skip: Int!, $take: Int!, $filtersArgs: [FiltersArgsDto!]) {
		tables(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				name
				code
				file {
					id
					url
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TablesGQL extends Apollo.Query<TablesQuery, TablesQueryVariables> {
	override document = TablesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const TableDocument = gql`
	query Table($tableId: String!) {
		table(id: $tableId) {
			code
			id
			name
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
export class TableGQL extends Apollo.Query<TableQuery, TableQueryVariables> {
	override document = TableDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
