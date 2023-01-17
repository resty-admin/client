import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map, tap } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { ORDER_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { ACTIVE_ORDER_PAGE_I18N } from "../constants";
import { ActiveOrderPageGQL } from "../graphql/active-order-page";

@UntilDestroy()
@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly placeId = PLACE_ID;
	readonly activeOrderPageI18n = ACTIVE_ORDER_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly usersControl = new FormControl<any>();

	readonly productsControl = new FormControl<any>();
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly order$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this.usersControl.valueChanges
			.pipe(
				untilDestroyed(this),
				tap(async (users) => {
					const order = await lastValueFrom(this.order$);
					const productsByUser = Object.keys(this.productsControl.value).reduce(
						(productsMap, id) => ({
							...productsMap,
							[id]: (users || []).includes(
								(order.productsToOrders || []).find((productToOrder) => productToOrder.id === id)?.user.id
							)
						}),
						{}
					);

					this.productsControl.patchValue(productsByUser);
				})
			)
			.subscribe();

		this.order$.pipe(untilDestroyed(this)).subscribe((order) => {
			this._breadcrumbsService.setBreadcrumb({
				label: "В меню",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});
		});

		this._actionsService.setAction({
			label: "Выбрать тип оплаты",
			func: async () => {
				const products = Object.entries(this.productsControl.value)
					.filter(([_, value]) => value)
					.map(([key]) => key);

				await this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(ORDER_ID, orderId)], {
					queryParams: { products: JSON.stringify(products) }
				});
			}
		});

		await this._activeOrderPageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
