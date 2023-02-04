import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { ProductToOrderStatusEnum } from "@graphql";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { SharedService } from "@shared/services";

import type { HistoryOrderPageQuery } from "../graphql";

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
	order: HistoryOrderPageQuery["order"] | null = null;

	productsToOrdersByType: any[] = [];

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this.order = this._activatedRoute.snapshot.data["order"];

		this.productsToOrdersByType = this.displayStatuses.map((status) => ({
			status,
			productsToOrders: (this.order?.productsToOrders || []).filter(
				(productToOrder) => productToOrder.status === status
			)
		}));

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, this.order!.id)
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
