import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CommandsQueryVariables = Types.Exact<Record<string, never>>;

export interface CommandsQuery {
	__typename?: "Query";
	commands: {
		__typename?: "PaginatedCommand";
		totalCount: number;
		page: number;
		data?: { __typename?: "CommandEntity"; id: string; name: string }[] | null;
	};
}

export const CommandsDocument = gql`
	query Commands {
		commands {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CommandsGQL extends Apollo.Query<CommandsQuery, CommandsQueryVariables> {
	override document = CommandsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
