import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { ProductToOrderStatusEnum } from "@graphql";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ORDER_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { HistoryOrderPageGQL } from "../graphql";

//

@UntilDestroy()
@Component({
	selector: "app-history-order",
	templateUrl: "./history-order.component.html",
	styleUrls: ["./history-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderComponent implements OnInit, OnDestroy {
	readonly displayStatuses = [ProductToOrderStatusEnum.WaitingForApprove, ProductToOrderStatusEnum.Approved];
	readonly placeId = PLACE_ID;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly usersControl = new FormControl([]);

	private readonly _historyOrderPageQuery = this._historyOrderPageGQL.watch();

	readonly historyOrder$ = this._historyOrderPageQuery.valueChanges.pipe(
		map((result) => result.data.clientHistoryOrder)
	);

	productsToOrdersByType: any[] = [];

	constructor(
		readonly sharedService: SharedService,
		private readonly _historyOrderPageGQL: HistoryOrderPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await this._historyOrderPageQuery.setVariables({
			orderId
		});

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, orderId)
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
