import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { lastValueFrom, map } from "rxjs";
import { CLIENT_ROUTES, PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { OrderTypeEnum } from "../../../../../../../graphql";
import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { CONNECT_TO_TABLE_PAGE_I18N } from "../constants";
import { ConnectToTablePageGQL } from "../graphql/connect-to-table-page";

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

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		const code = this._routerService.getQueryParams("code");

		if (code) {
			this.codeControl.setValue(code);
			await this.connectToTable(code, this._routerService.getParams(PLACE_ID.slice(1)));
		}

		this._actionsService.setAction({
			label: "Подключиться",
			func: async () => {
				await this.connectToTable(this.codeControl.value.toString(), this._routerService.getParams(PLACE_ID.slice(1)));
			}
		});
	}

	async connectToTable(code: string, placeId: string) {
		try {
			const table = await lastValueFrom(
				this._connectToTablePageGQL.mutate({ code, placeId }).pipe(map((result) => result.data?.getTableByCode))
			);

			if (!table) {
				return;
			}

			const order = await lastValueFrom(
				this._ordersService
					.createOrder({ table: table.id, type: OrderTypeEnum.InPlace, place: placeId })
					.pipe(map((result) => result.data?.createOrder))
			);

			if (!order) {
				return;
			}

			await this._ordersService.setActiveOrderId(order.id);

			await this._routerService.navigateByUrl(CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, placeId));
		} catch (error: any) {
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
