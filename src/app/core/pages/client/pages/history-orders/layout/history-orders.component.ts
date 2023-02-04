import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map, switchMap, take } from "rxjs";

import { HistoryOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements OnInit, OnDestroy {
	private readonly _historyOrdersPageQuery = this._historyOrdersPageGQL.watch();
	readonly historyOrders$ = this._historyOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.historyOrders.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._authService.me$
			.pipe(
				take(1),
				switchMap((user) =>
					this._historyOrdersPageQuery.setVariables({
						placeId: this._routerService.getParams(PLACE_ID.slice(1)),
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					})
				),
				take(1)
			)
			.subscribe();

		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.ACTIVE_ORDERS.absolutePath });

		this._actionsService.setAction({
			label: "CREATE_ORDER",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
