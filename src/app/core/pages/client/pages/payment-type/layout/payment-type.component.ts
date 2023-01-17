import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { lastValueFrom, map } from "rxjs";

import { ActionsService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { OrdersService } from "../../../../../../features/orders";
import { CLIENT_ROUTES, ORDER_ID } from "../../../../../../shared/constants";
import { ApiService } from "../../../../../../shared/modules/api";
import { BreadcrumbsService } from "../../../../../../shared/modules/breadcrumbs";
import { RouterService } from "../../../../../../shared/modules/router";
import type { IRadioButtonOption } from "../../../../../../shared/ui/radio-button";
import { ToastrService } from "../../../../../../shared/ui/toastr";
import { PAYMENT_TYPE_PAGE_I18N } from "../constants";
import { PaymentTypePageGQL } from "../graphql/payment-type-page";

export enum PaymentType {
	CASH = "cash",
	TERMINAL = "terminal",
	CARD = "card"
}

@Component({
	selector: "app-payment-type",
	templateUrl: "./payment-type.component.html",
	styleUrls: ["./payment-type.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
	readonly paymentTypePageI18n = PAYMENT_TYPE_PAGE_I18N;
	private readonly paymentTypePageQuery = this._paymentTypeGQL.watch();

	readonly order$ = this.paymentTypePageQuery.valueChanges.pipe(map((result) => result.data.order));

	readonly paymentTypes: IRadioButtonOption[] = [
		{ value: PaymentType.CASH, label: "Наличными" },
		{ value: PaymentType.TERMINAL, label: "Терминалом" },
		{ value: PaymentType.CARD, label: `Картой` }
	];

	readonly paymentTypeControl = new FormControl<any>();

	constructor(
		private readonly _paymentTypeGQL: PaymentTypePageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _apiService: ApiService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _toastrService: ToastrService,
		private readonly _authService: AuthService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId)
		});

		this._actionsService.setAction({
			label: "Оплатить",
			func: async () => {
				const type = this.paymentTypeControl.value;
				const products = JSON.parse(this._routerService.getQueryParams("products") || "");
				const orderId = this._routerService.getParams(ORDER_ID.slice(1));

				if (type === PaymentType.CARD) {
					try {
						window.location.href = await lastValueFrom(
							this._apiService.post("fondy/create-payment-link", { orderId, products })
						);
					} catch (error) {
						console.error(error);
					}
				} else {
					try {
						await lastValueFrom(this._ordersService.setManualPayForProductsInOrderGQL(products));

						await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId));
					} catch (error) {
						console.error(error);
					}
				}
			}
		});

		await this.paymentTypePageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
