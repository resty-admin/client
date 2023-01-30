import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { CloseConfirmationComponent } from "@features/orders";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { PaymentStatus } from "@shared/enums";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { filter, map, switchMap, take } from "rxjs";

import { PAYMENT_STATUS_PAGE } from "../constants";
import { PaymentStatusPageService } from "../services";

@Component({
	selector: "app-payment-status",
	templateUrl: "./payment-status.component.html",
	styleUrls: ["./payment-status.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
	readonly paymentStatusPage = PAYMENT_STATUS_PAGE;
	paymentStatus: PaymentStatus = PaymentStatus.SUCCESS;
	order$ = this._paymentStatusPageService.paymentStatusPageQuery.valueChanges.pipe(map((result) => result.data.order));

	isAllPaid = false;

	constructor(
		private readonly _paymentStatusPageService: PaymentStatusPageService,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	ngOnInit() {
		// this.isAllPaid = (this.order?.productsToOrders || []).every(
		// 	(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
		// );

		this._actionsService.setAction({
			label: "Вернуться в заказ",
			func: () =>
				this._routerService.navigateByUrl(
					CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, this._routerService.getParams(ORDER_ID.slice(1)))
				)
		});
	}

	openCloseConfirmation() {
		this._dialogService
			.open(CloseConfirmationComponent, { data: this._routerService.getParams(ORDER_ID.slice(1)) })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result)),
				switchMap((result) => this._ordersService.closeOrder(result.id))
			)
			.subscribe(async () => {
				this._ordersService.setActiveOrderId(undefined);

				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
