import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-payment-status-skeleton",
	templateUrl: "./payment-status-skeleton.component.html",
	styleUrls: ["./payment-status-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusSkeletonComponent {}
