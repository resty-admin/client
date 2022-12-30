import { ChangeDetectionStrategy, Component } from "@angular/core";
import { switchMap, take } from "rxjs";

import { OrdersService } from "../../../../../../features/orders";
import { DYNAMIC_ID } from "../../../../../../shared/constants";
import { ApiService } from "../../../../../../shared/modules/api";
import { RouterService } from "../../../../../../shared/modules/router";

@Component({
	selector: "app-payment-type",
	templateUrl: "./payment-type.component.html",
	styleUrls: ["./payment-type.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeComponent {
	readonly order$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._ordersService.getOrder(id)));

	lastNumbers = "8335";
	paymentTypes = [
		{ value: "cash", label: "Наличными" },
		{ value: "terminal", label: "Терминалом" },
		{ value: "card", label: `Карта **** ${this.lastNumbers}` }
	];

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _apiService: ApiService,
		private readonly _routerService: RouterService
	) {}

	pay(order: any) {
		this._apiService
			.post("fondy/create-payment-link", { orderId: order.id })
			.pipe(take(1))
			.subscribe(({ link }: any) => {
				console.log(link);
				window.open(link, "_blank")?.focus();
			});
	}
}
