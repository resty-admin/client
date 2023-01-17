import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import { ORDER_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ProductToOrderStatusEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { HISTORY_ORDER_PAGE_I18N } from "../constants";
import { HistoryOrderPageGQL } from "../graphql/history-order-page";

@UntilDestroy()
@Component({
	selector: "app-history-order",
	templateUrl: "./history-order.component.html",
	styleUrls: ["./history-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderComponent implements OnInit, OnDestroy {
	readonly placeId = PLACE_ID;
	readonly historyOrderPageI18n = HISTORY_ORDER_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly usersControl = new FormControl<any>();
	private readonly _historyOrderPageQuery = this._historyOrderPageGQL.watch();
	readonly order$ = this._historyOrderPageQuery.valueChanges.pipe(
		map((result) => result.data.order),
		map((order) => ({
			...order,
			productsToOrdersByType: this.displayStatuses.map((status) => ({
				status,
				productsToOrders: order.productsToOrders?.filter((productToOrder) => productToOrder.status === status)
			}))
		}))
	);

	readonly displayStatuses = [
		ProductToOrderStatusEnum.Added,
		ProductToOrderStatusEnum.WaitingForApprove,
		ProductToOrderStatusEnum.Approved
	];

	constructor(
		private readonly _historyOrderPageGQL: HistoryOrderPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		this.order$.pipe(untilDestroyed(this)).subscribe((order) => {
			this._breadcrumbsService.setBreadcrumb({
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});

			this._actionsService.setAction({
				label: "Выбрать тип оплаты",
				func: async () => {
					await this._routerService.navigate([CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(ORDER_ID, order.id)], {
						queryParams: { users: JSON.stringify(this.usersControl.value) }
					});
				}
			});
		});

		await this._historyOrderPageQuery.setVariables({ orderId });
	}

	closeOrder(order: any) {
		this._ordersService.closeOrder(order).pipe(take(1)).subscribe();
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
