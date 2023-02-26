import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type CreateOrderPageQueryVariables = Types.Exact<{
	orderId?: Types.InputMaybe<Types.Scalars["String"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface CreateOrderPageQuery {
	__typename?: "Query";
	order?: { __typename?: "ActiveOrderEntity"; id: string; code: number; type: Types.OrderTypeEnum } | null;
}

export type CreateOrderPagePlaceQueryVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface CreateOrderPagePlaceQuery {
	__typename?: "Query";
	place: { __typename?: "PlaceEntity"; id: string; a11y: any };
}

export const CreateOrderPageDocument = gql`
	query CreateOrderPage($orderId: String, $filtersArgs: [FiltersArgsDto!]) {
		order(id: $orderId, filtersArgs: $filtersArgs) {
			id
			code
			type
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateOrderPageGQL extends Apollo.Query<CreateOrderPageQuery, CreateOrderPageQueryVariables> {
	override document = CreateOrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateOrderPagePlaceDocument = gql`
	query CreateOrderPagePlace($placeId: String!) {
		place(id: $placeId) {
			id
			a11y
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateOrderPagePlaceGQL extends Apollo.Query<
	CreateOrderPagePlaceQuery,
	CreateOrderPagePlaceQueryVariables
> {
	override document = CreateOrderPagePlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
