import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type IsTimeAvailableQueryVariables = Types.Exact<{
	date: Types.Scalars["DateTime"];
	placeId: Types.Scalars["String"];
}>;

export interface IsTimeAvailableQuery {
	__typename?: "Query";
	isTimeAvailable: boolean;
}

export type IsTableAvailableForReserveQueryVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
	date: Types.Scalars["DateTime"];
}>;

export interface IsTableAvailableForReserveQuery {
	__typename?: "Query";
	isTableAvailableForReserve: { __typename?: "TableEntity"; id: string };
}

export const IsTimeAvailableDocument = gql`
	query isTimeAvailable($date: DateTime!, $placeId: String!) {
		isTimeAvailable(date: $date, placeId: $placeId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class IsTimeAvailableGQL extends Apollo.Query<IsTimeAvailableQuery, IsTimeAvailableQueryVariables> {
	override document = IsTimeAvailableDocument;

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
