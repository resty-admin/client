import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-active-order-skeleton",
	templateUrl: "./active-order-skeleton.component.html",
	styleUrls: ["./active-order-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderSkeletonComponent {}
