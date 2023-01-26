import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductOutput } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map, switchMap } from "rxjs";

import { PRODUCTS_PAGE } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-menu",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	readonly productsPage = PRODUCTS_PAGE;

	readonly products$ = this._activatedRoute.data.pipe(
		map((data) => data["products"]),
		switchMap((products) =>
			this._ordersService.productsToOrders$.pipe(
				map((productsToOrders) =>
					products.map((product: any) => ({
						...product,
						productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
					}))
				)
			)
		)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		const { placeId, categoryId } = this._routerService.getParams();

		if (!placeId || !categoryId) {
			return;
		}

		this._ordersService.productsToOrders$.pipe(untilDestroyed(this)).subscribe((productsToOrder) => {
			this._actionsService.setAction({
				label: "Подвтердить",
				disabled: productsToOrder.length === 0,
				func: async () => {
					await this._routerService.navigateByUrl(
						CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(PLACE_ID, placeId)
					);
				}
			});
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId)
		});
	}

	removeProductFromOrder(productOutput: IProductOutput) {
		this._ordersService.removeProductFromOrder(productOutput);
	}

	addProductToOrder(productOutput: IProductOutput) {
		this._ordersService.addProductToOrder(productOutput);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
