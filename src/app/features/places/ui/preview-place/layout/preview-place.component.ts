import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";
import dayjs from "dayjs";

import type { IPreviewPlace } from "../interfaces";

@Component({
	selector: "app-preview-place",
	templateUrl: "./preview-place.component.html",
	styleUrls: ["./preview-place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPlaceComponent implements OnChanges {
	@Input() place?: IPreviewPlace | null;

	isOpen: boolean = false;

	ngOnChanges(changes: ISimpleChanges<PreviewPlaceComponent>) {
		if (!changes.place || !changes.place.currentValue) {
			return;
		}

		const { start, end } = changes.place.currentValue.weekDays;

		const now = dayjs();

		this.isOpen = now.isAfter(dayjs(start.toString(), "HH")) && now.isBefore(dayjs(end.toString(), "HH"));
	}
}
