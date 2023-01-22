import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { FormControl } from "@ngneat/reactive-forms";
import { ORDER_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map } from "rxjs";

import { CONNECT_TO_ORDER_PAGE_I18N } from "../constants";

@Component({
	selector: "app-connect-to-order",
	templateUrl: "./connect-to-order.component.html",
	styleUrls: ["./connect-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToOrderComponent implements OnInit, OnDestroy {
	readonly connectToOrderPageI18n = CONNECT_TO_ORDER_PAGE_I18N;
	codeControl = new FormControl();

	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.PLACES.absolutePath
		});

		this._actionsService.setAction({
			label: "Подключиться",
			func: async () => {
				const order = await lastValueFrom(
					this._ordersService
						.addUserToOrder(Number.parseInt(`${this.codeControl.value}`))
						.pipe(map((result) => result.data?.addUserToOrder))
				);

				if (!order) {
					return;
				}

				await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, order.id));
			}
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
