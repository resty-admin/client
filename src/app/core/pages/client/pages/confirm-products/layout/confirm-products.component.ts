import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductOutput } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { filter, map, switchMap, take, tap } from "rxjs";

import { CONFIRM_PRODUCTS_PAGE } from "../constants";
import { ConfirmProductsPageService } from "../services";
//
// map((productsToOrders) =>
// 	(this.products || [])
// 		.map((product) => ({
// 			...product,
// 			productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
// 		}))
// 		.filter((product) => product.productsToOrders.length)
// )
@UntilDestroy()
@Component({
	selector: "app-confirm-products",
	templateUrl: "./confirm-products.component.html",
	styleUrls: ["./confirm-products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmProductsComponent implements OnInit, OnDestroy {
	readonly confirmProductsPage = CONFIRM_PRODUCTS_PAGE;

	readonly products$ = this._confirmProductsPageService.confirmProductsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data as any)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _confirmProductsPageService: ConfirmProductsPageService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(
				PLACE_ID,
				this._routerService.getParams(PLACE_ID.slice(1))
			)
		});

		this._ordersService.productsToOrders$.pipe(untilDestroyed(this)).subscribe((productsToOrder) => {
			this._actionsService.setAction({
				label: "Подтвердить",
				disabled: productsToOrder.length === 0,
				func: () => {
					this._ordersService.activeOrderId$
						.pipe(
							take(1),
							tap(async (orderId) => {
								if (orderId) {
									return;
								}
								await this._routerService.navigateByUrl(
									CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(
										PLACE_ID,
										this._routerService.getParams(PLACE_ID.slice(1))
									)
								);
							}),
							filter((orderId) => Boolean(orderId)),
							switchMap((orderId) =>
								this._ordersService.confirmProductsToOrders(
									(productsToOrder || []).map((productToOrder) => ({
										...productToOrder,
										orderId: orderId!
									}))
								)
							)
						)
						.subscribe(async (result) => {
							if (!result.data?.confirmProductsToOrders) {
								return;
							}

							this._ordersService.setProductsToOrders([]);
							await this._routerService.navigateByUrl(
								CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, result.data.confirmProductsToOrders.id)
							);
						});
				}
			});
		});
	}

	removeProductFromOrder(productOutput: IProductOutput) {
		this._ordersService.removeProductFromOrder({
			...productOutput,
			placeId: this._routerService.getParams(PLACE_ID.slice(1)) || ""
		});
	}

	addProductToOrder(productOutput: IProductOutput) {
		this._ordersService.addProductToOrder({
			...productOutput,
			placeId: this._routerService.getParams(PLACE_ID.slice(1)) || ""
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
