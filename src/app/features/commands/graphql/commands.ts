import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type EmitCommandMutationVariables = Types.Exact<{
	commandId: Types.Scalars["String"];
	tableId: Types.Scalars["String"];
}>;

export interface EmitCommandMutation {
	__typename?: "Mutation";
	emitCommand: string;
}

export const EmitCommandDocument = gql`
	mutation EmitCommand($commandId: String!, $tableId: String!) {
		emitCommand(commandId: $commandId, tableId: $tableId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class EmitCommandGQL extends Apollo.Mutation<EmitCommandMutation, EmitCommandMutationVariables> {
	override document = EmitCommandDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
