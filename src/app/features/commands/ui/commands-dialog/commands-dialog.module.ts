import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CommandsDialogComponent } from "./layout/commands-dialog.component";

@NgModule({
	declarations: [CommandsDialogComponent],
	imports: [CommonModule],
	exports: [CommandsDialogComponent]
})
export class CommandsDialogModule {}
