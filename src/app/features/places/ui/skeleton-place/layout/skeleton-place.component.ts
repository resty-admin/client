import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-skeleton-place",
	templateUrl: "./skeleton-place.component.html",
	styleUrls: ["./skeleton-place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonPlaceComponent {}
