import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommandsDialogGQL } from "@features/commands/ui/commands-dialog/graphql";
import { DialogRef } from "@ngneat/dialog";
import { map } from "rxjs";

@Component({
	selector: "app-commands-dialog",
	templateUrl: "./commands-dialog.component.html",
	styleUrls: ["./commands-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsDialogComponent implements OnInit {
	private readonly _commandsDialogQuery = this._commandsDialogGQL.watch();

	readonly commands$ = this._commandsDialogQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(private readonly _commandsDialogGQL: CommandsDialogGQL, private readonly _dialogRef: DialogRef) {}

	async ngOnInit() {
		if (!this._dialogRef.data || !this._dialogRef.data.placeId) {
			return;
		}

		await this._commandsDialogQuery.setVariables({
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
