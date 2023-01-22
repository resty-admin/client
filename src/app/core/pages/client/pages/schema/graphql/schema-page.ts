import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type SchemaPageHallsQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface SchemaPageHallsQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
}

export type SchemaPageTablesQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface SchemaPageTablesQuery {
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
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
					hall: { __typename?: "HallEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export const SchemaPageHallsDocument = gql`
	query SchemaPageHalls($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		halls(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SchemaPageHallsGQL extends Apollo.Query<SchemaPageHallsQuery, SchemaPageHallsQueryVariables> {
	override document = SchemaPageHallsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const SchemaPageTablesDocument = gql`
	query SchemaPageTables($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		tables(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				file {
					id
					url
				}
				hall {
					id
					name
				}
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SchemaPageTablesGQL extends Apollo.Query<SchemaPageTablesQuery, SchemaPageTablesQueryVariables> {
	override document = SchemaPageTablesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
