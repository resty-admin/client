import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CommandsGQL } from "../../graphql/commands";

@Injectable({ providedIn: "root" })
export class CommandsService {
	readonly commands$ = this._commandsGQL.watch().valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(private readonly _commandsGQL: CommandsGQL) {}

	async refetch() {
		await this._commandsGQL.watch().refetch();
	}
}
