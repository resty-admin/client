import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IOrderPreview } from "../interfaces";

@Component({
	selector: "app-preview-order",
	templateUrl: "./preview-order.component.html",
	styleUrls: ["./preview-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewOrderComponent {
	@Input() order?: IOrderPreview | null;
	@Input() isActive: boolean = false;
}
