import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IPreviewTable } from "../interfaces";

@Component({
	selector: "app-preview-table",
	templateUrl: "./preview-table.component.html",
	styleUrls: ["./preview-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTableComponent {
	@Input() table?: IPreviewTable | null;
	@Input() active = false;
}
