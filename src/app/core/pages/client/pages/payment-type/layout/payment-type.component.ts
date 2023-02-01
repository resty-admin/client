import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { PaymentType } from "@shared/enums";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map, take } from "rxjs";

import { PAYMENT_TYPE_PAGE } from "../constants";
import { PAYMENT_TYPES } from "../data";
import { PaymentTypePageService } from "../services";

@UntilDestroy()
@Component({
	selector: "app-payment-type",
	templateUrl: "./payment-type.component.html",
	styleUrls: ["./payment-type.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
	readonly paymentTypePage = PAYMENT_TYPE_PAGE;
	readonly paymentTypes = PAYMENT_TYPES;

	readonly order$ = this._paymentTypePageService.paymentTypePageQuery.valueChanges.pipe(
		map((result) => result.data.order)
	);

	totalPrice: number = 0;

	readonly paymentTypeControl = new FormControl();

	constructor(
		private readonly _paymentTypePageService: PaymentTypePageService,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		// this.totalPrice = (this.order?.productsToOrders || [])
		// 	.filter((productToOrder) =>
		// 		JSON.parse(this._activatedRoute.snapshot.queryParamMap.get("products") || "").includes(productToOrder.id)
		// 	)
		// 	.reduce(
		// 		(sum, productToOrder) =>
		// 			sum +
		// 			(productToOrder.product.price +
		// 				(productToOrder.attributes || []).reduce((_sum, attribute) => _sum + attribute.price, 0)) *
		// 				productToOrder.count,
		// 		0
		// 	);

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(
				ORDER_ID,
				this._routerService.getParams(ORDER_ID.slice(1))
			)
		});

		this.paymentTypeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			this._actionsService.setAction({
				label: "Оплатить",
				disabled: !value,
				func: () => {
					const type = this.paymentTypeControl.value;
					const products = JSON.parse(this._routerService.getQueryParams("products") || "");
					const orderId = this._routerService.getParams(ORDER_ID.slice(1));

					if (type === PaymentType.CARD) {
						this._ordersService
							.createPaymentOrderLink(products)
							.pipe(take(1))
							.subscribe((result) => {
								if (!result.data) {
									return;
								}

								window.location.href = result.data.createPaymentOrderLink.link;
							});
					} else {
						this._ordersService
							.setManualPayForProductsInOrderGQL(products)
							.pipe(take(1))
							.subscribe(async () => {
								await this._routerService.navigateByUrl(
									CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId)
								);
							});
					}
				}
			});
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
