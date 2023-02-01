import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { map, take } from "rxjs";

import type { CommandsDialogQuery } from "../graphql";
import { CommandsDialogGQL } from "../graphql";

@Component({
	selector: "app-commands-dialog",
	templateUrl: "./commands-dialog.component.html",
	styleUrls: ["./commands-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsDialogComponent implements OnInit {
	commands: CommandsDialogQuery["commands"]["data"];

	constructor(private readonly _commandsDialogGQL: CommandsDialogGQL, private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		if (!this._dialogRef.data || !this._dialogRef.data.placeId) {
			return;
		}

		this._commandsDialogGQL
			.fetch({
				filtersArgs: [
					{
						key: "place.id",
						operator: "=",
						value: this._dialogRef.data.placeId
					}
				]
			})
			.pipe(
				take(1),
				map((result) => result.data.commands.data)
			)
			.subscribe((commands) => {
				this.commands = commands;
			});
	}

	closeDialog(commandId: string) {
		this._dialogRef.close(commandId);
	}
}
