import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map, switchMap, tap } from "rxjs";
import { CATEGORY_ID, ORDER_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ProductToOrderStatusEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import type { IEmit } from "../../../../../../features/products";
import { ProductDialogComponent } from "../../../../../../features/products";
import { DialogService } from "../../../../../../shared/ui/dialog";
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
						productsToOrders: (order.productsToOrders || []).filter(
							(productToOrder) =>
								productToOrder.product.id === product.id && productToOrder.status === ProductToOrderStatusEnum.Added
						)
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

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		await this._menuPageCategoriesQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
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
				CLIENT_ROUTES.CATEGORY.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categoryId)
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
			func: async () => {
				const activeOrderId = this._ordersService.getActiveOrderId();

				if (!activeOrderId) {
					return;
				}

				await this._routerService.navigateByUrl(
					CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(ORDER_ID, activeOrderId)
				);
			}
		});
	}

	async openProductDialog(data: any) {
		const result = await lastValueFrom(this._dialogService.open(ProductDialogComponent, { data }).afterClosed$);

		if (!result) {
			return;
		}

		await this.addProductToOrder({ productId: result.product.id, attributesIds: [] });
	}

	async removeProductFromOrder({ productId, attributesIds }: IEmit) {
		const activeOrderId = this._ordersService.getActiveOrderId();

		await lastValueFrom(
			this._ordersService.removeProductFromOrder({
				productId,
				orderId: activeOrderId!,
				attrs: attributesIds
			})
		);

		await this._menuPageOrderQuery.refetch();
	}

	async addProductToOrder({ productId, attributesIds }: IEmit) {
		const activeOrderId = this._ordersService.getActiveOrderId();

		if (!activeOrderId) {
			return;
		}

		await lastValueFrom(
			this._ordersService.addProductToOrder({
				productId,
				orderId: activeOrderId,
				attrs: attributesIds
			})
		);

		await this._menuPageOrderQuery.refetch();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
