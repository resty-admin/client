import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { ProductDialogComponent } from "@features/products";
import type { IProductToSelect } from "@features/products/ui/products-select/interfaces";
import { ProductToOrderStatusEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CATEGORY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { filter, lastValueFrom, map, ReplaySubject, switchMap, take, tap } from "rxjs";

import { MENU_PAGE_I18N } from "../constants";
import { MenuPageCategoriesGQL, MenuPageOrderGQL, MenuPageProductsGQL } from "../graphql";
import type { IProductChanged } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
	readonly menuPageI18n = MENU_PAGE_I18N;
	private readonly _menuPageCategoriesQuery = this._menuPageCategoriesGQL.watch();
	private readonly _menuPageProductsQuery = this._menuPageProductsGQL.watch();
	private readonly _menuPageOrderQuery = this._menuPageOrderGQL.watch();
	private readonly _selectedCategorySubject = new ReplaySubject<string>();
	readonly selectedCategory$ = this._selectedCategorySubject.asObservable();
	readonly categories$ = this._menuPageCategoriesQuery.valueChanges.pipe(
		map((result) => result.data.categories.data),
		tap(async (categories) => {
			const { categoryId, placeId } = this._routerService.getParams();

			if (!categories || !categories[0] || categoryId) {
				return;
			}

			await this._routerService.navigateByUrl(
				CLIENT_ROUTES.CATEGORY.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categories[0].id)
			);
		})
	);

	readonly products$ = this.selectedCategory$.pipe(
		take(1),
		switchMap(() =>
			this._menuPageProductsQuery.valueChanges.pipe(
				map((result) => result.data.products.data),
				switchMap((products) =>
					this._menuPageOrderQuery.valueChanges.pipe(
						map((result) => result.data.order),
						map((order) =>
							(products || []).map((product) => ({
								...product,
								productsToOrders: (order.productsToOrders || [])
									.filter(
										(productToOrder) =>
											productToOrder.product.id === product.id &&
											productToOrder.status === ProductToOrderStatusEnum.Added
									)
									.map((productToOrder) => ({
										...productToOrder,
										attributes: productToOrder.attributes || []
									}))
							}))
						)
					)
				)
			)
		)
	);

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

		this._routerService
			.selectParams(CATEGORY_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (categoryId) => {
				if (!categoryId) {
					return;
				}

				this._selectedCategorySubject.next(categoryId);

				await this._menuPageProductsQuery.setVariables({
					filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }]
				});
			});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		const orderId = await lastValueFrom(
			this._ordersService.activeOrderId$.pipe(
				filter((orderId) => Boolean(orderId)),
				take(1)
			)
		);

		if (!orderId) {
			return;
		}

		await this._menuPageOrderQuery.refetch({ orderId });

		await this._menuPageCategoriesQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});

		this._actionsService.setAction({
			label: "Подвтердить",
			func: async () => {
				const activeOrderId = await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)));

				if (!activeOrderId) {
					return;
				}

				await this._routerService.navigateByUrl(
					CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(ORDER_ID, activeOrderId)
				);
			}
		});
	}

	async setSelectedCategory(categoryId: string) {
		await this._routerService.navigateByUrl(
			CLIENT_ROUTES.CATEGORY.absolutePath
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
				.replace(CATEGORY_ID, categoryId)
		);
	}

	async openProductDialog(data: IProductToSelect) {
		const result = await lastValueFrom(this._dialogService.open(ProductDialogComponent, { data }).afterClosed$);

		if (!result) {
			return;
		}

		await this.addProductToOrder({ productId: result.product.id, attributesIds: [] });
	}

	async removeProductFromOrder({ productId, attributesIds }: IProductChanged) {
		const activeOrderId = await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)));

		if (!activeOrderId) {
			return;
		}

		await lastValueFrom(
			this._ordersService.removeProductFromOrder({
				productId,
				orderId: activeOrderId,
				attrs: attributesIds
			})
		);

		await this._menuPageOrderQuery.refetch();
	}

	async addProductToOrder({ productId, attributesIds }: IProductChanged) {
		const activeOrderId = await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)));

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
