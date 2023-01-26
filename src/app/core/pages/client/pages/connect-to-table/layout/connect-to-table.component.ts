import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrderTypeEnum } from "@graphql";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom } from "rxjs";

import { CONNECT_TO_TABLE_PAGE } from "../constants";
import { ConnectToTablePageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-connect-to-table",
	templateUrl: "./connect-to-table.component.html",
	styleUrls: ["./connect-to-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToTableComponent implements OnInit, OnDestroy {
	readonly connectToTablePage = CONNECT_TO_TABLE_PAGE;
	readonly codeControl = new FormControl<number>();

	constructor(
		private readonly _connectToTablePageGQL: ConnectToTablePageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
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

		this.codeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((code) => {
			this._actionsService.setAction({
				label: "Подключиться",
				disabled: code?.toString().length !== 4,
				func: async () => {
					await this.connectToTable(
						this.codeControl.value.toString(),
						this._routerService.getParams(PLACE_ID.slice(1))
					);
				}
			});
		});

		this.codeControl.setValue(this._routerService.getQueryParams("code"));
	}

	async connectToTable(code: string, placeId: string) {
		try {
			const tableResult = await lastValueFrom(this._connectToTablePageGQL.mutate({ code, placeId }));

			if (!tableResult.data) {
				return;
			}

			const table = tableResult.data.getTableByCode;

			const orderResult = await lastValueFrom(
				this._ordersService.createOrder({ table: table.id, type: OrderTypeEnum.InPlace, place: placeId })
			);

			if (!orderResult.data) {
				return;
			}

			const order = orderResult.data.createOrder;

			await this._ordersService.setActiveOrderId(order.id);

			await this._routerService.navigateByUrl(CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId));
		} catch (error) {
			if (!(error instanceof Error)) {
				return;
			}

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
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
