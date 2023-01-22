import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ProfilePageQueryVariables = Types.Exact<{
	userId: Types.Scalars["String"];
}>;

export interface ProfilePageQuery {
	__typename?: "Query";
	user: { __typename?: "UserEntity"; id: string; name: string };
}

export const ProfilePageDocument = gql`
	query ProfilePage($userId: String!) {
		user(id: $userId) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProfilePageGQL extends Apollo.Query<ProfilePageQuery, ProfilePageQueryVariables> {
	override document = ProfilePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
