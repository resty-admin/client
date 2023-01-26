import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-preview-place-skeleton",
	templateUrl: "./preview-place-skeleton.component.html",
	styleUrls: ["./preview-place-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPlaceSkeletonComponent {}
