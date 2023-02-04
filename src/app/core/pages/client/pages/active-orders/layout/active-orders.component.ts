import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map, switchMap, take } from "rxjs";

import { ActiveOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly historyOrdersLink = CLIENT_ROUTES.HISTORY_ORDERS.absolutePath;
	private readonly _activeOrdersPageQuery = this._activeOrdersPageGQL.watch();
	readonly activeOrders$ = this._activeOrdersPageQuery.valueChanges.pipe(map((result) => result.data.orders.data));

	constructor(
		readonly sharedService: SharedService,
		private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._authService.me$
			.pipe(
				take(1),
				switchMap((user) =>
					this._activeOrdersPageQuery.setVariables({
						filtersArgs: [{ key: "users.id", operator: "=[]", value: user!.id }]
					})
				),
				take(1)
			)
			.subscribe();

		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.PLACES.absolutePath });

		this._actionsService.setAction({
			label: "CREATE_ORDER",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
			}
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
