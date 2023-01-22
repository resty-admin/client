import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductOutput } from "@features/products";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map, switchMap, take } from "rxjs";

import { CONFIRM_PRODUCTS_PAGE_I18N } from "../constants";
import { ConfirmProductsPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-confirm-products",
	templateUrl: "./confirm-products.component.html",
	styleUrls: ["./confirm-products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmProductsComponent implements OnInit, OnDestroy {
	readonly confirmProductsPageI18n = CONFIRM_PRODUCTS_PAGE_I18N;
	private readonly _confirmProductsPageQuery = this._confirmProductsPageGQL.watch();
	private readonly _products$ = this._confirmProductsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data)
	);

	readonly products$ = this._products$.pipe(
		switchMap((products) =>
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
		private readonly _confirmProductsPageGQL: ConfirmProductsPageGQL,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId)
		});

		this._actionsService.setAction({
			label: "Подтвердить",
			func: async () => {
				const orderId = await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)));

				if (!orderId) {
					await this._routerService.navigateByUrl(
						`${CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)}?withData=true`
					);
					return;
				}

				const productsToOrder = await lastValueFrom(this._ordersService.productsToOrders$.pipe(take(1)));

				await lastValueFrom(
					this._ordersService.confirmProductsToOrders(
						(productsToOrder || []).map((productToOrder) => ({ ...productToOrder, orderId }))
					)
				);

				this._ordersService.setProductsToOrders([]);

				await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId));
			}
		});
	}

	async removeProductFromOrder(productOutput: IProductOutput) {
		this._ordersService.removeProductFromOrder(productOutput);
	}

	async addProductToOrder(productOutput: IProductOutput) {
		this._ordersService.addProductToOrder(productOutput);
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
