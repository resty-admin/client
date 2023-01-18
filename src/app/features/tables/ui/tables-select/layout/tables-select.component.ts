import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { ISelectTable } from "../interfaces";

@Component({
	selector: "app-tables-select",
	templateUrl: "./tables-select.component.html",
	styleUrls: ["./tables-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSelectComponent {
	@Output() tableClicked = new EventEmitter<ISelectTable>();
	@Input() tables?: ISelectTable[] | null;

	trackByFn(index: number) {
		return index;
	}

	emitTableClick(selectTable: ISelectTable) {
		this.tableClicked.emit(selectTable);
	}
}
