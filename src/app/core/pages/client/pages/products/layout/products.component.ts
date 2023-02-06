import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductInput, IProductOutput, IStoreProductToOrder } from "@features/products";
import { ProductDialogComponent } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CATEGORY_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { filter, map, switchMap, take } from "rxjs";

import { ProductsPageGQL } from "../graphql";

interface IProductClicked {
	product: IProductInput;
	productToOrder?: IStoreProductToOrder;
}
@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	private readonly _productsPageQuery = this._productsPageGQL.watch();

	readonly products$ = this._productsPageQuery.valueChanges.pipe(
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
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	async ngOnInit() {
		const categoryId = this._routerService.getParams(CATEGORY_ID.slice(1));

		await this._productsPageQuery.setVariables({
			filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }]
		});

		this._ordersService.productsToOrders$.pipe(untilDestroyed(this)).subscribe((productsToOrder) => {
			this._actionsService.setAction({
				label: "CONFIRM",
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

	openProductDialog(data: IProductClicked) {
		this._dialogService
			.open(ProductDialogComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result))
			)
			.subscribe((product) => {
				const updateBody = {
					productId: product.id,
					attributesIds: product.attributesIds,
					count: product.count,
					placeId: this._routerService.getParams(PLACE_ID.slice(1)) || ""
				};

				if (data.productToOrder) {
					this._ordersService.updateProductToOrder(data.productToOrder.id, updateBody);
				} else {
					this._ordersService.addProductToOrder(updateBody);
				}
			});
	}

	removeProductFromOrder(productToOrder: IStoreProductToOrder) {
		this._ordersService.removeProductFromOrder(productToOrder.id);
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
