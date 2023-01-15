import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { OrderTypeEnum } from "../../../../../../../graphql";
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
	readonly activeOrderPageI18n = ACTIVE_ORDER_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly usersControl = new FormControl<any>();
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly order$ = this._activeOrderPageQuery.valueChanges.pipe(
		map((result) => result.data.order),
		map((order) => ({
			...order,
			usersToOrdersByType: this.displayStatuses.map((status) => ({
				status,
				usersToOrders: order.usersToOrders?.filter((userToOrder) => userToOrder.status === status)
			}))
		}))
	);

	readonly displayStatuses = Object.keys(OrderTypeEnum);

	constructor(
		private readonly _activeOrderPageGQL: ActiveOrderPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(DYNAMIC_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (orderId) => {
				await this._activeOrderPageQuery.setVariables({ orderId });
			});

		this.order$.pipe(untilDestroyed(this)).subscribe((order) => {
			this._breadcrumbsService.setBreadcrumb({
				label: "В меню",
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});

			this._actionsService.setAction({
				label: "Выбрать тип оплаты",
				func: async () => {
					await this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(DYNAMIC_ID, order.id)], {
						queryParams: { users: JSON.stringify(this.usersControl.value) }
					});
				}
			});
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
