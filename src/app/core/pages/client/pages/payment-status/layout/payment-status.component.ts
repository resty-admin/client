import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { ORDER_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";

import { PAYMENT_STATUS_PAGE_I18N } from "../constants";

@Component({
	selector: "app-payment-status",
	templateUrl: "./payment-status.component.html",
	styleUrls: ["./payment-status.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
	readonly paymentStatusPageI18n = PAYMENT_STATUS_PAGE_I18N;

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._actionsService.setAction({
			label: "Вернуться в заказ",
			func: () => this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId))
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
