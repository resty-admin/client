import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/actions";
import { OrdersService } from "../../../../../../features/orders";

@UntilDestroy()
@Component({
	selector: "app-connect-to-table",
	templateUrl: "./connect-to-table.component.html",
	styleUrls: ["./connect-to-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToTableComponent implements OnInit, OnDestroy {
	codeControl = new FormControl();

	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId }) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, placeId));

				this._actionsService.setAction({
					label: "Отправить",
					action: () => {
						this._ordersService
							.addUserToOrder(Number.parseInt(`${this.codeControl.value}`))
							.subscribe(async (order: any) => {
								await this._routerService.navigateByUrl(
									CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(DYNAMIC_ID, order.id)
								);
							});
					}
				});
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
