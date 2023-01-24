import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ActiveOrdersPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ActiveOrdersPageQuery {
	__typename?: "Query";
	orders: {
		__typename?: "PaginatedActiveOrder";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ActiveOrderEntity";
					id: string;
					code: number;
					totalPrice?: number | null;
					type: Types.OrderTypeEnum;
					place: { __typename?: "PlaceEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export const ActiveOrdersPageDocument = gql`
	query ActiveOrdersPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		orders(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				code
				totalPrice
				type
				place {
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
export class ActiveOrdersPageGQL extends Apollo.Query<ActiveOrdersPageQuery, ActiveOrdersPageQueryVariables> {
	override document = ActiveOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
