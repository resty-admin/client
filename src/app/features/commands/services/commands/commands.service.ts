import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CommandsGQL } from "../../graphql/commands";

@Injectable({ providedIn: "root" })
export class CommandsService {
	private readonly _commandsQuery = this._commandsGQL.watch({ skip: 0, take: 5 });

	readonly commands$ = this._commandsQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(private readonly _commandsGQL: CommandsGQL) {}
}
