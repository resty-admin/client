import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-payment-status-skeleton",
	templateUrl: "./payment-status-skeleton.component.html",
	styleUrls: ["./payment-status-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusSkeletonComponent {}
