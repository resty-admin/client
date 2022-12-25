import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-payment-type",
	templateUrl: "./payment-type.component.html",
	styleUrls: ["./payment-type.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeComponent {
	lastNumbers = "8335";
	paymentTypes = [
		{ value: "cash", label: "Наличными" },
		{ value: "terminal", label: "Наличными" },
		{ value: "card", label: `Карта **** ${this.lastNumbers}` }
	];
}
