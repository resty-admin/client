import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, map, switchMap, take } from "rxjs";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import type { IEmit } from "../../../../../../features/products";
import { PRODUCTS_PAGE_I18N } from "../constants";
import { ProductsPageGQL, ProductsPageOrderGQL } from "../graphql/products-pages";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	readonly productsPageI18n = PRODUCTS_PAGE_I18N;
	private readonly _productsPageQuery = this._productsPageGQL.watch();
	private readonly _productsPageOrderQuery = this._productsPageOrderGQL.watch();

	readonly products$ = this._productsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data),
		switchMap((products) =>
			this._productsPageOrderQuery.valueChanges.pipe(
				map((result) => result.data.order),
				map((order) =>
					products!.map((product) => ({
						...product,
						usersToOrders: (order.usersToOrders || []).filter((userToOrder) => userToOrder.product.id === product.id)
					}))
				)
			)
		)
	);

	constructor(
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _productsPageOrderGQL: ProductsPageOrderGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService
	) {}

	removeProductFromOrder({ productId, attributesIds }: IEmit) {
		this._ordersService.activeOrderId$
			.pipe(
				take(1),
				filter((activeOrderId) => Boolean(activeOrderId)),
				switchMap((activeOrderId) =>
					this._ordersService.removeProductFromOrder({
						productId,
						orderId: activeOrderId!,
						attrs: attributesIds
					})
				),
				take(1)
			)
			.subscribe();
	}

	addProductToOrder({ productId, attributesIds }: IEmit) {
		this._ordersService.activeOrderId$
			.pipe(
				take(1),
				filter((activeOrderId) => Boolean(activeOrderId)),
				switchMap((activeOrderId) =>
					this._ordersService.addProductToOrder({
						productId,
						orderId: activeOrderId!,
						attrs: attributesIds
					})
				),
				take(1)
			)
			.subscribe();
	}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(async ({ placeId, categoryId }) => {
				this._breadcrumbsService.setBreadcrumb({
					routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId)
				});

				await this._productsPageQuery.setVariables({
					filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }]
				});
			});

		this._ordersService.activeOrderId$.pipe(untilDestroyed(this)).subscribe(async (orderId) => {
			if (!orderId) {
				return;
			}

			await this._productsPageOrderQuery.refetch({ orderId });
		});

		this._actionsService.setAction({
			label: "Подтвердить",
			func: () => {
				this._ordersService.activeOrderId$
					.pipe(
						take(1),
						filter((orderId) => Boolean(orderId))
					)
					.subscribe(async (orderId) => {
						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(DYNAMIC_ID, orderId!)
						);
					});
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
