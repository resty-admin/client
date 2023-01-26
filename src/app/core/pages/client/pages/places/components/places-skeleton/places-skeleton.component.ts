import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-places-skeleton",
	templateUrl: "./places-skeleton.component.html",
	styleUrls: ["./places-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesSkeletonComponent {}
