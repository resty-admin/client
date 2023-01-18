import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IPreviewCategory } from "../interfaces";

@Component({
	selector: "app-preview-category",
	templateUrl: "./preview-category.component.html",
	styleUrls: ["./preview-category.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCategoryComponent {
	@Input() category?: IPreviewCategory | null;
}
