import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { switchMap, take } from "rxjs";
import { ProductsService } from "src/app/features/products";
import { PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { OrdersService } from "../../../../../../features/orders";
import { AuthService } from "../../../../auth/services";

@UntilDestroy()
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
	readonly products$: Observable<any> = this._productsService.products$;

	constructor(
		private readonly _routerService: RouterService,
		private readonly _productsService: ProductsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _authService: AuthService
	) {}

	updateOrder(count: number, product: any) {
		this._authService
			.getMe()
			.pipe(
				take(1),
				switchMap((user: any) =>
					this._ordersService.updateActiveOrder((order) => ({
						id: order.id,
						usersToOrders: [
							// ...(order.usersToOrders?.map((userToOrder: any) => ({
							// 	id: userToOrder.id,
							// 	count: userToOrder.count,
							// 	user: userToOrder.user.id,
							// 	product: userToOrder.product.id
							// })) || []),
							{
								product: product.id,
								user: user.id,
								count
							}
						]
					}))
				),
				take(1)
			)
			.subscribe();
	}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId }) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId));
			});
	}
}
