import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, map, switchMap, take } from "rxjs";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import type { ProductEntity, UserToOrderEntity } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import type { IEmit } from "../../../../../../features/products";
import type { DeepAtLeast } from "../../../../../../shared/interfaces";
import { CONFIRM_PRODUCTS_PAGE_I18N } from "../constants";
import { ConfirmProductsPageGQL } from "../graphql/confirm-products-pages";

export type IConfirmProductsMap = Record<
	string,
	DeepAtLeast<ProductEntity, "id"> & { usersToOrders?: DeepAtLeast<UserToOrderEntity, "count">[] }
>;
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
				(order.usersToOrders || []).reduce<IConfirmProductsMap>(
					(productsMap, userToOrder) => ({
						...productsMap,
						[userToOrder.product.id]: {
							...userToOrder.product,
							usersToOrders: [...(productsMap[userToOrder.product.id]?.usersToOrders || []), userToOrder]
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

	ngOnInit() {
		this._routerService
			.selectParams(DYNAMIC_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (orderId) => {
				await this._confirmProductsPageQuery.refetch({ orderId });
			});

		this._order$.pipe(untilDestroyed(this)).subscribe((order) => {
			this._breadcrumbsService.setBreadcrumb({
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});
		});

		this._actionsService.setAction({
			label: "Подтвердить",
			func: async () => {
				const order = this._routerService.getParams(DYNAMIC_ID.slice(1));

				await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(DYNAMIC_ID, order));
			}
		});
	}

	removeProductFromOrder({ productId, attributesIds }: IEmit) {
		this._ordersService.activeOrderId$
			.pipe(
				take(1),
				filter((activeOrderId) => Boolean(activeOrderId)),
				switchMap((activeOrderId) =>
					this._ordersService.removeProductFromOrder({ productId, orderId: activeOrderId!, attrs: attributesIds })
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
					this._ordersService.addProductToOrder({ productId, orderId: activeOrderId!, attrs: attributesIds })
				),
				take(1)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
