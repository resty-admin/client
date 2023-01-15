import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { CLIENT_ROUTES, PLACE_ID } from "src/app/shared/constants";
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
				this._breadcrumbsService.setBreadcrumb({
					routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
				});
			});

		this._routerService
			.selectQueryParams("code")
			.pipe(untilDestroyed(this))
			.subscribe((code) => {
				this.codeControl.setValue(code);
				this.connectToTable(code, this._routerService.getParams(PLACE_ID.slice(1)));
			});

		this._actionsService.setAction({
			label: "Подключиться",
			func: () => {
				this.connectToTable(this.codeControl.value.toString(), this._routerService.getParams(PLACE_ID.slice(1)));
			}
		});
	}

	connectToTable(code: string, placeId: string) {
		this._connectToTablePageGQL
			.mutate({ code, placeId })
			.pipe(
				take(1),
				map((result) => result.data?.getTableByCode),
				switchMap((table) =>
					this._ordersService.createOrder({ table: table!.id, type: OrderTypeEnum.InPlace, place: placeId })
				),
				take(1),
				map((result) => result.data?.createOrder)
			)
			.subscribe({
				next: async (order) => {
					if (!order) {
						return;
					}

					await this._ordersService.setActiveOrderId(order.id);

					await this._routerService.navigateByUrl(CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId));
				},
				error: async (error) => {
					switch (Number.parseInt(error.message)) {
						case 1023: {
							console.error(`Invalid Code`);
							break;
						}
						case 1024: {
							const placeId = this._routerService.getParams(PLACE_ID.slice(1));

							await this._routerService.navigateByUrl(
								CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, placeId)
							);
						}
					}
				}
			});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
