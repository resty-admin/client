import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-skeleton-order",
	templateUrl: "./skeleton-order.component.html",
	styleUrls: ["./skeleton-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonOrderComponent {}
