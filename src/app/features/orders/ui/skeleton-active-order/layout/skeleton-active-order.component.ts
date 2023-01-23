import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-skeleton-active-order",
	templateUrl: "./skeleton-active-order.component.html",
	styleUrls: ["./skeleton-active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonActiveOrderComponent {}
