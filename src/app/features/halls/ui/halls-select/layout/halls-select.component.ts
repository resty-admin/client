import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { IHallToSelect } from "../interfaces";

@Component({
	selector: "app-halls-select",
	templateUrl: "./halls-select.component.html",
	styleUrls: ["./halls-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSelectComponent {
	@Output() selectedHallChange = new EventEmitter<string>();
	@Input() halls?: IHallToSelect[] | null;
	@Input() selectedHall?: string | null;

	trackByFn(index: number) {
		return index;
	}

	emitSelectedHallChange(hallId: string) {
		this.selectedHallChange.emit(hallId);
	}
}
