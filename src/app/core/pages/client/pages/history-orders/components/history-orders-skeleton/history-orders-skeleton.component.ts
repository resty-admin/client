import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-history-orders-skeleton",
	templateUrl: "./history-orders-skeleton.component.html",
	styleUrls: ["./history-orders-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersSkeletonComponent {}
