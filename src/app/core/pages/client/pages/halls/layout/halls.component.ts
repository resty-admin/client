import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OrdersService } from "@features/orders";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map, of, switchMap } from "rxjs";

import { HALLS_PAGE_I18N } from "../constants";
import { HallsPageGQL, HallsPageOrderGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-schema",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	readonly hallsPageI18n = HALLS_PAGE_I18N;
	private readonly _hallsPageQuery = this._hallsPageGQL.watch();
	readonly halls$ = this._hallsPageQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		switchMap((halls) =>
			this._ordersService.activeOrderId$.pipe(
				switchMap((orderId) =>
					orderId
						? this._hallsPageOrderGQL.watch({ orderId }).valueChanges.pipe(map((result) => result.data.order))
						: of(null)
				),
				map((order) => (halls || []).map((hall) => ({ ...hall, active: hall.id === order?.table?.hall?.id })))
			)
		)
	);

	constructor(
		private readonly _hallsPageOrderGQL: HallsPageOrderGQL,
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		await this._hallsPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	trackByFn(index: number) {
		return index;
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
