import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-payment-type-skeleton",
	templateUrl: "./payment-type-skeleton.component.html",
	styleUrls: ["./payment-type-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeSkeletonComponent {}
