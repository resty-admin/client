import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, map, switchMap, take, tap } from "rxjs";
import { CATEGORY_ID, DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import type { IEmit } from "../../../../../../features/products";
import { DialogService } from "../../../../../../shared/ui/dialog";
import { ProductDialogComponent } from "../compnents";
import { MENU_PAGE_I18N } from "../constants";
import { MenuPageCategoriesGQL, MenuPageOrderGQL, MenuPageProductsGQL } from "../graphql/menu-page";

@UntilDestroy()
@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
	readonly menuPagei18n = MENU_PAGE_I18N;

	private readonly _menuPageCategoriesQuery = this._menuPageCategoriesGQL.watch();
	readonly categories$ = this._menuPageCategoriesQuery.valueChanges.pipe(
		map((result) => result.data.categories.data),
		tap((categories) => {
			if (!categories || !categories[0] || this.categoryControl.value) {
				return;
			}

			this.categoryControl.setValue(categories[0].id);
		})
	);

	private readonly _menuPageOrderQuery = this._menuPageOrderGQL.watch();
	private readonly _menuPageProductsQuery = this._menuPageProductsGQL.watch();
	readonly products$ = this._menuPageProductsQuery.valueChanges.pipe(
		map((result) => result.data.products.data),
		switchMap((products) =>
			this._menuPageOrderQuery.valueChanges.pipe(
				map((result) => result.data.order),
				map((order) =>
					products?.map((product) => ({
						...product,
						usersToOrders: (order.usersToOrders || []).filter((userToOrder) => userToOrder.product.id === product.id)
					}))
				)
			)
		)
	);

	readonly categoryControl = new FormControl<string>();
	constructor(
		private readonly _menuPageCategoriesGQL: MenuPageCategoriesGQL,
		private readonly _menuPageProductsGQL: MenuPageProductsGQL,
		private readonly _menuPageOrderGQL: MenuPageOrderGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				this._breadcrumbsService.setBreadcrumb({
					routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
				});

				await this._menuPageCategoriesQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});

		this._routerService
			.selectParams(CATEGORY_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (categoryId) => {
				this.categoryControl.setValue(categoryId);
			});

		this.categoryControl.valueChanges.pipe(untilDestroyed(this)).subscribe(async (categoryId) => {
			if (!categoryId || categoryId === this._routerService.getParams(CATEGORY_ID.slice(1))) {
				return;
			}

			await this._menuPageProductsQuery.setVariables({
				filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }]
			});

			await this._routerService.navigateByUrl(
				CLIENT_ROUTES.CATEGORY.absolutePath
					.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
					.replace(CATEGORY_ID, categoryId)
			);
		});

		this._ordersService.activeOrderId$.pipe(untilDestroyed(this)).subscribe(async (orderId) => {
			if (!orderId) {
				return;
			}

			await this._menuPageOrderQuery.refetch({ orderId });
		});

		this._actionsService.setAction({
			label: "Подвтердить",
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

	openProductDialog(data: any) {
		this._dialogService
			.open(ProductDialogComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result))
			)
			.subscribe(async ({ product }) => {
				this.addProductToOrder({ productId: product.id, attributesIds: [] });
			});
	}

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
			.subscribe(async () => {
				await this._menuPageOrderQuery.refetch();
			});
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
			.subscribe(async () => {
				await this._menuPageOrderQuery.refetch();
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
