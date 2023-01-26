import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-preview-order-skeleton",
	templateUrl: "./preview-order-skeleton.component.html",
	styleUrls: ["./preview-order-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewOrderSkeletonComponent {}
