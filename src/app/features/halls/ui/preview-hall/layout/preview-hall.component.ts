import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IPreviewHall } from "../interfaces";

@Component({
	selector: "app-preview-hall",
	templateUrl: "./preview-hall.component.html",
	styleUrls: ["./preview-hall.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewHallComponent {
	@Input() hall?: IPreviewHall | null;
}
