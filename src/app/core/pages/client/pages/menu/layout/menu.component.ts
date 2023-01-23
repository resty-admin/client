import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductInput, IProductOutput } from "@features/products";
import { ProductDialogComponent } from "@features/products";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CATEGORY_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { lastValueFrom, map, ReplaySubject, shareReplay, switchMap, tap } from "rxjs";

import { MENU_PAGE_I18N } from "../constants";
import { MenuPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
	readonly menuPageI18n = MENU_PAGE_I18N;
	private readonly _menuPageQuery = this._menuPageGQL.watch();
	private readonly _selectedCategorySubject = new ReplaySubject<string>();
	readonly selectedCategory$ = this._selectedCategorySubject.asObservable();

	readonly categories$ = this._menuPageQuery.valueChanges.pipe(
		map((result) => result.data.categories.data),
		tap(async (categories) => {
			const { categoryId, placeId } = this._routerService.getParams();

			if (!categories || !categories[0] || categoryId) {
				return;
			}

			await this._routerService.navigateByUrl(
				CLIENT_ROUTES.CATEGORY.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categories[0].id)
			);
		}),
		shareReplay({ refCount: true })
	);

	readonly products$ = this.categories$.pipe(
		switchMap((categories) =>
			this._ordersService.productsToOrders$.pipe(
				switchMap((productsToOrders) =>
					this.selectedCategory$.pipe(
						map((categoryId) => (categories || []).find((category) => category.id === categoryId)?.products || []),
						map((products) =>
							products.map((product) => ({
								...product,
								productsToOrders: productsToOrders.filter((productToOrder) => productToOrder.productId === product.id)
							}))
						)
					)
				)
			)
		)
	);

	constructor(
		private readonly _menuPageGQL: MenuPageGQL,
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
			});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		await this._menuPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});

		this._actionsService.setAction({
			label: "Подвтердить",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(PLACE_ID, placeId));
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

	async openProductDialog(data: IProductInput) {
		const result = await lastValueFrom(this._dialogService.open(ProductDialogComponent, { data }).afterClosed$);

		if (!result) {
			return;
		}

		await this.addProductToOrder({ productId: result.product.id, attributesIds: [] });
	}

	async removeProductFromOrder(productOutput: IProductOutput) {
		this._ordersService.removeProductFromOrder(productOutput);
	}

	async addProductToOrder(productOutput: IProductOutput) {
		this._ordersService.addProductToOrder(productOutput);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
