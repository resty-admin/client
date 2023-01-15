import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { Observable } from "rxjs";
import { take } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { PAYMENT_STATUS_PAGE_I18N } from "../constants";

@Component({
	selector: "app-payment-status",
	templateUrl: "./payment-status.component.html",
	styleUrls: ["./payment-status.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
	readonly paymentStatusPageI18n = PAYMENT_STATUS_PAGE_I18N;
	readonly order$: Observable<any> = this._routerService.selectParams(DYNAMIC_ID.slice(1));

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this.order$.pipe(take(1)).subscribe((order: any) => {
			this._actionsService.setAction({
				label: "Вернуться в заказ",
				func: () =>
					this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(DYNAMIC_ID, order.id))
			});
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
