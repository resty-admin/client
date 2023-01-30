import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-payment-type-skeleton",
	templateUrl: "./payment-type-page-skeleton.component.html",
	styleUrls: ["./payment-type-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypePageSkeletonComponent {}
