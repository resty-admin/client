import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { PREVIEW_PLACE_I18N } from "../constants";
import type { IPreviewPlace } from "../interfaces";

@Component({
	selector: "app-preview-place",
	templateUrl: "./preview-place.component.html",
	styleUrls: ["./preview-place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPlaceComponent {
	@Input() place?: IPreviewPlace | null;

	readonly previewPlaceI18n = PREVIEW_PLACE_I18N;
}
