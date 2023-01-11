import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs";
import { PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { AuthService } from "../../../../../../features/auth/services";
import { OrdersService } from "../../../../../../features/orders";
import { ProductsPageGQL } from "../graphql/products-pages";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
	private readonly _productsPageQuery = this._productsPageGQL.watch();

	readonly products$: Observable<any> = this._productsPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data),
		switchMap((products: any) =>
			this._ordersService.activeOrder$.pipe(
				map((activeOrder: any) =>
					products.map((product: any) => {
						const productsByUser = activeOrder.usersToOrders?.filter(
							(userToOrder: any) => product.id === userToOrder.product.id
						);

						return {
							...product,
							count: productsByUser?.reduce((pre: any, curr: any) => pre + curr.count, 0) || 0
						};
					})
				)
			)
		)
	);

	user: any;

	constructor(
		private readonly _productsPageGQL: ProductsPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService
	) {}

	removeProductFromOrder(product: any) {
		this._ordersService
			.removeUserProductInOrder(product)
			.pipe(take(1))
			.subscribe(() => {});
	}

	addProductToOrder(product: any) {
		this._ordersService
			.addProductToOrder({ product: product.id, user: this.user.id })
			.pipe(take(1))
			.subscribe(() => {});
	}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId }) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId));
			});

		this._authService
			.getMe()
			.pipe(untilDestroyed(this))
			.subscribe((user) => {
				this.user = user;
			});
	}
}
