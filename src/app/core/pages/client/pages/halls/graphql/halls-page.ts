import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type HallsPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface HallsPageQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "HallEntity";
					id: string;
					name: string;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export type HallsPageOrderQueryVariables = Types.Exact<{
	orderId?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export interface HallsPageOrderQuery {
	__typename?: "Query";
	order?: {
		__typename?: "ActiveOrderEntity";
		table?: { __typename?: "TableEntity"; hall: { __typename?: "HallEntity"; id: string } } | null;
	} | null;
}

export const HallsPageDocument = gql`
	query HallsPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		halls(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				file {
					id
					url
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
export class HallsPageGQL extends Apollo.Query<HallsPageQuery, HallsPageQueryVariables> {
	override document = HallsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const HallsPageOrderDocument = gql`
	query HallsPageOrder($orderId: String) {
		order(id: $orderId) {
			table {
				hall {
					id
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HallsPageOrderGQL extends Apollo.Query<HallsPageOrderQuery, HallsPageOrderQueryVariables> {
	override document = HallsPageOrderDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
