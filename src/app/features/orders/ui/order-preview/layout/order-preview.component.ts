import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { IOrderPreview } from "../interfaces";

@Component({
	selector: "app-order-preview",
	templateUrl: "./order-preview.component.html",
	styleUrls: ["./order-preview.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPreviewComponent {
	@Input() order?: IOrderPreview | null;
	@Input() isActive: boolean = false;
}
