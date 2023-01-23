import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map, take } from "rxjs";

import { ALL_ORDERS_PAGE_I18N } from "../constants";
import { AllOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements OnInit, OnDestroy {
	readonly allOrdersPageI18n = ALL_ORDERS_PAGE_I18N;
	readonly clienRoutes = CLIENT_ROUTES;
	readonly orderId = ORDER_ID;

	private readonly _allOrdersPageQuery = this._allOrdersPageGQL.watch();
	private readonly _allOrders$ = this._allOrdersPageQuery.valueChanges;
	readonly historyOrders$ = this._allOrders$.pipe(map((result) => result.data.historyOrders.data));
	readonly orders$ = this._allOrders$.pipe(map((result) => result.data.orders.data));

	constructor(
		private readonly _allOrdersPageGQL: AllOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.PLACES.absolutePath });
		this._actionsService.setAction({
			label: "Создать заказ",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			}
		});

		const user = await lastValueFrom(this._authService.me$.pipe(take(1)));

		if (!user) {
			return;
		}

		await this._allOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "users.id", operator: "=[]", value: user.id }]
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
