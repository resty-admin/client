import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map, take } from "rxjs";

import { ACTIVE_ORDERS_PAGE_I18N } from "../constants";
import { ActiveOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly activeOrdersPageI18n = ACTIVE_ORDERS_PAGE_I18N;
	readonly historyOrdersLink = CLIENT_ROUTES.HISTORY_ORDERS.absolutePath;
	private readonly _activeOrdersPageQuery = this._activeOrdersPageGQL.watch();
	readonly activeOrders$: any = this._activatedRoute.data.pipe(map((data) => data["activeOrders"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL,
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

		await this._activeOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "users.id", operator: "=[]", value: user.id }]
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
