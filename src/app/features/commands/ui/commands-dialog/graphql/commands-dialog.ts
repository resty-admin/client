import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../graphql";
export type CommandsDialogQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface CommandsDialogQuery {
	__typename?: "Query";
	commands: {
		__typename?: "PaginatedCommand";
		data?: { __typename?: "CommandEntity"; id: string; name: string; description: string }[] | null;
	};
}

export const CommandsDialogDocument = gql`
	query CommandsDialog($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		commands(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				description
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CommandsDialogGQL extends Apollo.Query<CommandsDialogQuery, CommandsDialogQueryVariables> {
	override document = CommandsDialogDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
