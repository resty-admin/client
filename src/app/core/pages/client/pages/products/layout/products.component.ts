import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductsPageGQL } from "@core/pages/client/pages/products/graphql/products-page";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { IProductOutput } from "@features/products";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CATEGORY_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map, take } from "rxjs";

import { PRODUCTS_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-menu",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
	readonly productsPageI18n = PRODUCTS_PAGE_I18N;
	private readonly _productsPageQuery = this._productsPageGQL.watch();

	readonly products$ = this._activatedRoute.data.pipe(map((data) => data["products"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		const categoryId = this._routerService.getParams(CATEGORY_ID.slice(1));

		if (!categoryId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId)
		});

		this._productsPageQuery
			.setVariables({ filtersArgs: [{ key: "category.id", operator: "=", value: categoryId }] })
			.then();

		this.setAction().then();
	}

	async setAction() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		const productsToOrder = await lastValueFrom(this._ordersService.productsToOrders$.pipe(take(1)));

		this._actionsService.setAction({
			label: "Подвтердить",
			disabled: productsToOrder.length === 0,
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(PLACE_ID, placeId));
			}
		});
	}

	async removeProductFromOrder(productOutput: IProductOutput) {
		this._ordersService.removeProductFromOrder(productOutput);

		await this.setAction();
	}

	async addProductToOrder(productOutput: IProductOutput) {
		this._ordersService.addProductToOrder(productOutput);

		await this.setAction();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
