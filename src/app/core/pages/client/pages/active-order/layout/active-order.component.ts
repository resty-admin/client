import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { map, switchMap, take, tap } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ProductToOrderStatusEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/actions";

@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent implements OnInit, OnDestroy {
	readonly clientRoutes = CLIENT_ROUTES;

	readonly usersControl = new FormControl();

	readonly order$ = this._routerService.selectParams(DYNAMIC_ID.slice(1)).pipe(
		switchMap((id) => this._ordersService.getOrder(id)),
		tap((order) => {
			this._ordersService.setActiveOrder(order as any);
		}),
		map((order) => ({
			...order,
			usersToOrdersByType: this.displayStatuses.map((status) => ({
				status,
				usersToOrders: order.usersToOrders?.filter((userToOrder) => userToOrder.status === status)
			}))
		}))
	);

	readonly displayStatuses = [
		ProductToOrderStatusEnum.Added,
		ProductToOrderStatusEnum.Confirmed,
		ProductToOrderStatusEnum.Paid
	];

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.ALL_ORDERS.absolutePath);

		this._actionsService.setAction({
			label: "Выбрать тип оплаты",
			action: () =>
				this.order$.pipe(take(1)).subscribe(async (order) => {
					await this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(DYNAMIC_ID, order.id)], {
						queryParams: { users: JSON.stringify(this.usersControl.value) }
					});
				})
		});
	}

	get users(): any {
		return this.usersControl.value;
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
