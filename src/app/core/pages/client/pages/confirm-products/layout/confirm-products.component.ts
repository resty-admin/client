import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IPreviewProduct, IProductToOrder } from "@features/products/ui/preview-product/interfaces";
import { ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map } from "rxjs";

import { CONFIRM_PRODUCTS_PAGE_I18N } from "../constants";
import { ConfirmProductsPageGQL } from "../graphql";
import type { IProductChanged } from "../interfaces";

export type IConfirmProductsMap = Record<string, IPreviewProduct & { productsToOrders: IProductToOrder[] }>;
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
	private readonly _order$ = this._confirmProductsPageQuery.valueChanges.pipe(map((result) => result.data.order));

	readonly products$ = this._order$.pipe(
		map((order) =>
			Object.values(
				(order.productsToOrders || [])
					.filter((productToOrder) => productToOrder.status === ProductToOrderStatusEnum.Added)
					.reduce<IConfirmProductsMap>(
						(productsMap, productToOrder) => ({
							...productsMap,
							[productToOrder.product.id]: {
								...productToOrder.product,
								productsToOrders: [
									...(productsMap[productToOrder.product.id]?.productsToOrders || []),
									{ ...productToOrder, attributes: productToOrder.attributes || [] }
								]
							}
						}),
						{}
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
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		await this._confirmProductsPageQuery.refetch({ orderId });

		this._order$.pipe(untilDestroyed(this)).subscribe((order) => {
			this._breadcrumbsService.setBreadcrumb({
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});
		});

		this._actionsService.setAction({
			label: "Подтвердить",
			func: async () => {
				const orderId = this._routerService.getParams(ORDER_ID.slice(1));

				try {
					await lastValueFrom(this._ordersService.confirmOrder(orderId));

					await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, orderId));
				} catch (error) {
					console.error(error);
				}
			}
		});
	}

	async removeProductFromOrder({ productId, attributesIds }: IProductChanged) {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		try {
			await lastValueFrom(this._ordersService.removeProductFromOrder({ productId, orderId, attrs: attributesIds }));

			await this._confirmProductsPageQuery.refetch();
		} catch (error) {
			console.error(error);
		}
	}

	async addProductToOrder({ productId, attributesIds }: IProductChanged) {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		try {
			await lastValueFrom(this._ordersService.addProductToOrder({ productId, orderId, attrs: attributesIds }));

			await this._confirmProductsPageQuery.refetch();
		} catch (error) {
			console.error(error);
		}
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
