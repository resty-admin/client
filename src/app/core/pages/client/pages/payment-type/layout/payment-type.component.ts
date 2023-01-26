import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PAYMENT_TYPES } from "@core/pages/client/pages/payment-type/data";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import type { Observable } from "rxjs";
import { lastValueFrom, map } from "rxjs";

import { PAYMENT_TYPE_PAGE_I18N } from "../constants";
import { PaymentType } from "../enums";
import { PaymentTypePageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-payment-type",
	templateUrl: "./payment-type.component.html",
	styleUrls: ["./payment-type.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
	readonly paymentTypePageI18n = PAYMENT_TYPE_PAGE_I18N;
	private readonly paymentTypePageQuery = this._paymentTypeGQL.watch();

	readonly paymentTypes = PAYMENT_TYPES;

	readonly order$: Observable<any> = this._activatedRoute.data.pipe(map((data) => data["order"]));

	readonly paymentTypeControl = new FormControl();

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _paymentTypeGQL: PaymentTypePageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId)
		});

		this.paymentTypeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			this._actionsService.setAction({
				label: "Оплатить",
				disabled: !value,
				func: async () => {
					const type = this.paymentTypeControl.value;
					const products = JSON.parse(this._routerService.getQueryParams("products") || "");
					const orderId = this._routerService.getParams(ORDER_ID.slice(1));

					if (type === PaymentType.CARD) {
						try {
							const result = await lastValueFrom(this._ordersService.createPaymentOrderLink(products));

							if (!result.data) {
								return;
							}

							window.location.href = result.data.createPaymentOrderLink.link;
						} catch (error) {
							console.error(error);
						}
					} else {
						try {
							await lastValueFrom(this._ordersService.setManualPayForProductsInOrderGQL(products));

							await this._routerService.navigateByUrl(
								CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId)
							);
						} catch (error) {
							console.error(error);
						}
					}
				}
			});
		});

		await this.paymentTypePageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
