import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-payment-status-skeleton",
	templateUrl: "./payment-status-page-skeleton.component.html",
	styleUrls: ["./payment-status-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusPageSkeletonComponent {}
