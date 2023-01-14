import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { CLIENT_ROUTES, DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { CONNECT_TO_TABLE_PAGE_I18N } from "../constants";
import { ConnectToTablePageGQL } from "../graphql/connect-to-table-page";

@UntilDestroy()
@Component({
	selector: "app-connect-to-table",
	templateUrl: "./connect-to-table.component.html",
	styleUrls: ["./connect-to-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToTableComponent implements OnInit, OnDestroy {
	readonly connectToTableI18n = CONNECT_TO_TABLE_PAGE_I18N;
	readonly codeControl = new FormControl<string>();

	constructor(
		private readonly _connectToTablePageGQL: ConnectToTablePageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe((placeId) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, placeId));
			});

		this._actionsService.setAction({
			label: "Подключиться",
			action: () => {
				const tableCode = this.codeControl.value;
				const place = this._routerService.getParams(DYNAMIC_ID.slice(1));

				this._connectToTablePageGQL
					.watch({ tableId: tableCode })
					.valueChanges.pipe(
						take(1),
						map((result) => result.data.table),
						switchMap((table) =>
							this._ordersService.createOrder({ table: table.id, type: OrderTypeEnum.InPlace, place })
						),
						take(1),
						map((result) => result.data?.createOrder)
					)
					.subscribe(async (order) => {
						if (!order) {
							return;
						}

						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(DYNAMIC_ID, order.id)
						);
					});
			}
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBackUrl(null);
		this._actionsService.setAction(null);
	}
}
