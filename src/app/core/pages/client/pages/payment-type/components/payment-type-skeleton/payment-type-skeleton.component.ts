import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-payment-type-skeleton",
	templateUrl: "./payment-type-skeleton.component.html",
	styleUrls: ["./payment-type-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeSkeletonComponent {}
