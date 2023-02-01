import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductOutput } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map, switchMap, tap } from "rxjs";

import { PRODUCTS_PAGE } from "../constants";
import { ProductsPageService } from "../services";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	readonly productsPage = PRODUCTS_PAGE;

	readonly products$ = this._productsPageService.productsPageQuery.valueChanges.pipe(
		tap(() => {
			console.log("here");
		}),
		map((result) => result.data.products.data),
		switchMap((products) =>
			this._ordersService.productsToOrders$.pipe(
				map((productsToOrders) =>
					(products || []).map((product: any) => ({
						...product,
						productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
					}))
				)
			)
		)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _productsPageService: ProductsPageService,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._ordersService.productsToOrders$.pipe(untilDestroyed(this)).subscribe((productsToOrder) => {
			this._actionsService.setAction({
				label: "Подвтердить",
				disabled: productsToOrder.length === 0,
				func: () =>
					this._routerService.navigateByUrl(
						CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(
							PLACE_ID,
							this._routerService.getParams(PLACE_ID.slice(1))
						)
					)
			});
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(
				PLACE_ID,
				this._routerService.getParams(PLACE_ID.slice(1))
			)
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
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
