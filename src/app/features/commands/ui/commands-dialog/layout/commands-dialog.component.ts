import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { map } from "rxjs";

import { CommandsDialogGQL } from "../graphql";

@Component({
	selector: "app-commands-dialog",
	templateUrl: "./commands-dialog.component.html",
	styleUrls: ["./commands-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsDialogComponent implements OnInit {
	readonly _commandsQuery = this._commandsDialogGQL.watch();
	readonly commands$ = this._commandsQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(private readonly _commandsDialogGQL: CommandsDialogGQL, private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		if (!this._dialogRef.data || !this._dialogRef.data.placeId) {
			return;
		}

		this._commandsQuery.setVariables({
			filtersArgs: [
				{
					key: "place.id",
					operator: "=",
					value: this._dialogRef.data.placeId
				}
			]
		});
	}

	closeDialog(commandId: string) {
		this._dialogRef.close(commandId);
	}
}
