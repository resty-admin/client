import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-preview-product-skeleton",
	templateUrl: "./preview-product-skeleton.component.html",
	styleUrls: ["./preview-product-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductSkeletonComponent {}
