import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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
					hall: { __typename?: "HallEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export type SchemaPageOrderQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface SchemaPageOrderQuery {
	__typename?: "Query";
	order: { __typename?: "ActiveOrderEntity"; id: string; table?: { __typename?: "TableEntity"; id: string } | null };
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
export const SchemaPageOrderDocument = gql`
	query SchemaPageOrder($orderId: String!) {
		order(id: $orderId) {
			id
			table {
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SchemaPageOrderGQL extends Apollo.Query<SchemaPageOrderQuery, SchemaPageOrderQueryVariables> {
	override document = SchemaPageOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
