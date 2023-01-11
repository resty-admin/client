import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { switchMap, take } from "rxjs";

import { ActionsService } from "../../../../../../features/actions";
import { AuthService } from "../../../../../../features/auth/services";
import { OrdersService } from "../../../../../../features/orders";
import { DYNAMIC_ID } from "../../../../../../shared/constants";
import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { ApiService } from "../../../../../../shared/modules/api";
import { BreadcrumbsService } from "../../../../../../shared/modules/breadcrumbs";
import { RouterService } from "../../../../../../shared/modules/router";
import { ToastrService } from "../../../../../../shared/ui/toastr";

export enum PaymentType {
	CASH,
	TERMINAL,
	CARD
}

@Component({
	selector: "app-payment-type",
	templateUrl: "./payment-type.component.html",
	styleUrls: ["./payment-type.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
	readonly order$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._ordersService.getOrder(id)));

	readonly paymentTypes: any[] = [
		{ value: PaymentType.CASH, label: "Наличными" },
		{ value: PaymentType.TERMINAL, label: "Терминалом" },
		{ value: PaymentType.CARD, label: `Картой` }
	];

	readonly paymentTypeControl = new FormControl<any>();

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _apiService: ApiService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _toastrService: ToastrService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		console.log();

		this.order$.pipe(take(1)).subscribe((order) => {
			this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(DYNAMIC_ID, order.id));

			this._actionsService.setAction({
				label: "Оплатить",
				action: () =>
					({
						[PaymentType.CARD]: (order: any) => {
							const users = JSON.parse(this._routerService.getQueryParams("users") || "");

							this._apiService
								.post("fondy/create-payment-link", { orderId: order.id, userId: users[0] })
								.pipe(take(1))
								.subscribe(({ link }: any) => {
									window.location.href = link;
								});
						},
						[PaymentType.CASH]: () => {
							this._toastrService.error("Официант сейчас подойдет к вам");
						},
						[PaymentType.TERMINAL]: () => {
							this._toastrService.error("Официант сейчас подойдет к вам");
						}
					}[this.paymentTypeControl.value as PaymentType](order))
			});
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
