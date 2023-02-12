import { Injectable } from "@angular/core";
import { EmitCommandGQL } from "@features/commands/graphql";

@Injectable({ providedIn: "root" })
export class CommandsService {
	constructor(private readonly _emitCommandGQL: EmitCommandGQL) {}

	emitCommand(commandId: string, tableId: string) {
		return this._emitCommandGQL.mutate({ commandId, tableId });
	}
}
