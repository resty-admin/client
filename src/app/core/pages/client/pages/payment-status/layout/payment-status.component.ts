import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { CloseConfirmationComponent } from "@features/orders";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { PaymentType } from "@shared/enums";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import type { Observable } from "rxjs";
import { lastValueFrom, map, take } from "rxjs";

import { PAYMENT_STATUS_PAGE } from "../constants";
import { PaymentStatusPageGQL } from "../graphql";

@Component({
	selector: "app-payment-status",
	templateUrl: "./payment-status.component.html",
	styleUrls: ["./payment-status.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
	readonly paymentStatusPage = PAYMENT_STATUS_PAGE;

	private readonly _paymentStatusQuery = this._paymentStautsGQL.watch();

	paymentType: PaymentType = PaymentType.SUCCESS;

	readonly order$: Observable<any> = this._activatedRoute.data.pipe(map((data) => data["order"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _paymentStautsGQL: PaymentStatusPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._actionsService.setAction({
			label: "Вернуться в заказ",
			func: () => this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId))
		});

		await this._paymentStatusQuery.setVariables({ orderId });
	}

	async openCloseConfirmation() {
		const data = await lastValueFrom(this.order$.pipe(take(1)));

		const result = await lastValueFrom(this._dialogService.open(CloseConfirmationComponent, { data }).afterClosed$);

		if (!result || !result.id) {
			return;
		}

		await lastValueFrom(this._ordersService.closeOrder(result.id));

		this._ordersService.setActiveOrderId(undefined);

		await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
