import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-history-order-skeleton",
	templateUrl: "./history-order-skeleton.component.html",
	styleUrls: ["./history-order-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderSkeletonComponent {}
