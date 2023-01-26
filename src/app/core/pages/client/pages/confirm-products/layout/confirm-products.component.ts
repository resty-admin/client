import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductOutput } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { lastValueFrom, map, switchMap, take } from "rxjs";

import { CONFIRM_PRODUCTS_PAGE } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-confirm-products",
	templateUrl: "./confirm-products.component.html",
	styleUrls: ["./confirm-products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmProductsComponent implements OnInit, OnDestroy {
	readonly confirmProductsPage = CONFIRM_PRODUCTS_PAGE;

	readonly products$ = this._activatedRoute.data.pipe(
		map((data) => data["products"]),
		switchMap((products: any[]) =>
			this._ordersService.productsToOrders$.pipe(
				map((productsToOrders) =>
					(products || [])
						.map((product) => ({
							...product,
							productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
						}))
						.filter((product) => product.productsToOrders.length)
				)
			)
		)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
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
				func: async () => {
					const orderId = await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)));

					if (!orderId) {
						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(
								PLACE_ID,
								this._routerService.getParams(PLACE_ID.slice(1))
							)
						);
						return;
					}

					const data = (productsToOrder || []).map((productToOrder) => ({ ...productToOrder, orderId }));

					await lastValueFrom(this._ordersService.confirmProductsToOrders(data));

					this._ordersService.setProductsToOrders([]);

					await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId));
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
