import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { CloseConfirmationComponent } from "@features/orders";
import { ProductToOrderPaidStatusEnum } from "@graphql";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { PaymentStatus } from "@shared/enums";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { filter, map, switchMap, take } from "rxjs";

import { PaymentStatusPageGQL } from "../graphql";

@Component({
	selector: "app-payment-status",
	templateUrl: "./payment-status.component.html",
	styleUrls: ["./payment-status.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
	paymentStatus: PaymentStatus = PaymentStatus.SUCCESS;

	private readonly _paymentStatusPageQuery = this._paymentStatusPageGQL.watch();

	readonly order$ = this._paymentStatusPageQuery.valueChanges.pipe(map((result) => result.data.order));

	isAllPaid$ = this.order$.pipe(
		map((result) =>
			(result?.productsToOrders || []).every(
				(productToOrder) => productToOrder.paidStatus === ProductToOrderPaidStatusEnum.Paid
			)
		)
	);

	constructor(
		private readonly _paymentStatusPageGQL: PaymentStatusPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));
		await this._paymentStatusPageQuery.setVariables({ orderId });

		this._actionsService.setAction({
			label: "BACK_TO_ORDER",
			func: () => this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId))
		});
	}

	openCloseConfirmation() {
		this.order$
			.pipe(
				take(1),
				switchMap((data) => this._dialogService.open(CloseConfirmationComponent, { data }).afterClosed$),
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
