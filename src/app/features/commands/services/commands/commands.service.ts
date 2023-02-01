import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CommandsService {
	emitCommand(commandId: string) {
		return commandId;
	}
}
