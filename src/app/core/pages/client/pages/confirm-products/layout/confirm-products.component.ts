import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductInput, IProductOutput, IStoreProductToOrder } from "@features/products";
import { ProductDialogComponent } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { filter, map, switchMap, take, tap } from "rxjs";

import { ConfirmProductsPageGQL } from "../graphql";

interface IProductClicked {
	product: IProductInput;
	productToOrder?: IStoreProductToOrder;
}

@UntilDestroy()
@Component({
	selector: "app-confirm-products",
	templateUrl: "./confirm-products.component.html",
	styleUrls: ["./confirm-products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmProductsComponent implements OnInit, OnDestroy {
	private readonly _confirmProductsPageQuery = this._confirmProductsPageGQL.watch();
	readonly products$ = this._confirmProductsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data),
		switchMap((products) =>
			this._ordersService.productsToOrders$.pipe(
				map((productsToOrders) =>
					(products || [])
						.map((product: any) => ({
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
		private readonly _confirmProductsPageGQL: ConfirmProductsPageGQL,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _dialogService: DialogService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));
		await this._confirmProductsPageQuery.setVariables({
			filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId)
		});

		this.products$
			.pipe(
				switchMap((products) =>
					this._ordersService.productsToOrders$.pipe(
						map((productsToOrders) =>
							productsToOrders.map((productToOrder) => ({
								...productToOrder,
								price: products.find((product) => product.id === productToOrder.productId)?.price
							}))
						)
					)
				),
				untilDestroyed(this)
			)
			.subscribe((productsToOrder) => {
				const price = productsToOrder.reduce(
					(_price, productToOrder) => _price + (productToOrder?.price || 0) * productToOrder.count,
					0
				);

				this._actionsService.setAction({
					original: true,
					label: `Подтвердить на ${price}грн`,
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
											productId: productToOrder.productId,
											attributesIds: Object.values(productToOrder.attributesIds).flat(),
											count: productToOrder.count,
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
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
