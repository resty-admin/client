import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type UsersQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface UsersQuery {
	__typename?: "Query";
	users: {
		__typename?: "PaginatedUser";
		page: number;
		totalCount: number;
		data?: {
			__typename?: "UserEntity";
			email?: string | null;
			googleId?: string | null;
			id: string;
			name: string;
			password?: string | null;
			tel?: string | null;
			telegramId?: number | null;
			telegramToken?: string | null;
			role: Types.UserRoleEnum;
		}[] | null;
	};
}

export type UpdateUserMutationVariables = Types.Exact<{
	user: Types.UpdateUserInput;
}>;

export interface UpdateUserMutation { __typename?: "Mutation"; updateUser: { __typename?: "UserEntity"; id: string } }

export const UsersDocument = gql`
	query Users($skip: Int!, $take: Int!, $filtersArgs: [FiltersArgsDto!]) {
		users(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				email
				googleId
				id
				name
				password
				tel
				telegramId
				telegramToken
				role
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
	override document = UsersDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateUserDocument = gql`
	mutation UpdateUser($user: UpdateUserInput!) {
		updateUser(user: $user) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
	override document = UpdateUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
