import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ORDER_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

import { HISTORY_ORDER_PAGE_I18N } from "../constants";
import { HistoryOrderPageGQL } from "../graphql";

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
	readonly usersControl = new FormControl([]);
	private readonly _historyOrderPageQuery = this._historyOrderPageGQL.watch();
	readonly order$ = this._activatedRoute.data.pipe(map((data) => data["historyOrder"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _historyOrderPageGQL: HistoryOrderPageGQL,
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
			if (!order || !order.place) {
				return;
			}

			this._breadcrumbsService.setBreadcrumb({
				routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
			});
		});

		await this._historyOrderPageQuery.setVariables({ orderId });
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
