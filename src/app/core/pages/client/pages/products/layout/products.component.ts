import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { switchMap } from "rxjs";
import { ProductsService } from "src/app/features/products";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { OrdersService } from "../../../../../../features/orders";
import { AuthService } from "../../../../auth/services";
import { FooterService } from "../../../services";

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
		private readonly _authService: AuthService,
		private readonly _footersService: FooterService
	) {}

	createOrder() {
		this._authService
			.getMe()
			.pipe(
				switchMap((user: any) =>
					this._ordersService.createOrder({
						place: this._routerService.getParams(PLACE_ID.slice(1))!,
						totalPrice: 500,
						type: OrderTypeEnum.Delivery,
						users: [user?.id]
					})
				)
			)
			.subscribe(async (order) => {
				if (!order) {
					return;
				}

				await this._routerService.navigateByUrl(CLIENT_ROUTES.ORDER.absolutePath.replace(DYNAMIC_ID, order.id));
			});
	}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId }) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId));
			});

		// this._footersService.setAction({ label: "Создать заказ", func: () => this.createOrder() });
	}
}
