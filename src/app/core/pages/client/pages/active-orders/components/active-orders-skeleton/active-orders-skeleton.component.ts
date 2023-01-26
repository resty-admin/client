import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-active-orders-skeleton",
	templateUrl: "./active-orders-skeleton.component.html",
	styleUrls: ["./active-orders-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersSkeletonComponent {}
