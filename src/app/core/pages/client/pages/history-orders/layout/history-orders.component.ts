import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HistoryOrdersPageGQL } from "@core/pages/client/pages/history-orders/graphql/history-orders-page";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map, take } from "rxjs";

import { HISTORY_ORDERS_PAGE_I18N } from "../constants";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements OnInit, OnDestroy {
	readonly historyOrdersPageI18n = HISTORY_ORDERS_PAGE_I18N;

	private readonly _historyOrdersPageQuery = this._historyOrdersPageGQL.watch();
	readonly historyOrders$ = this._historyOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.historyOrders.data),
		map((historyOrders) =>
			(historyOrders || []).map((historyOrder) => ({
				...historyOrder,
				routerLink: CLIENT_ROUTES.HISTORY_ORDER.absolutePath.replace(ORDER_ID, historyOrder.id)
			}))
		)
	);

	constructor(
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.ACTIVE_ORDERS.absolutePath });

		const user = await lastValueFrom(this._authService.me$.pipe(take(1)));

		if (!user) {
			return;
		}

		await this._historyOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "users.id", operator: "=", value: user.id }]
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
