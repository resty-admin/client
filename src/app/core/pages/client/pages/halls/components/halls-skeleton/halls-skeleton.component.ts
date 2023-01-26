import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-halls-skeleton",
	templateUrl: "./halls-skeleton.component.html",
	styleUrls: ["./halls-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSkeletonComponent {}
