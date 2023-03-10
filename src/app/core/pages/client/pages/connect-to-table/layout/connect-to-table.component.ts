import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrderTypeEnum } from "@graphql";
import { DialogService } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import { filter, switchMap, take } from "rxjs";

import { RedirectConfirmationComponent } from "../components";
import { ConnectToTablePageGQL, GetOrderByIdGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-connect-to-table",
	templateUrl: "./connect-to-table.component.html",
	styleUrls: ["./connect-to-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToTableComponent implements OnInit, OnDestroy {
	readonly codeControl = new FormControl<number>();

	constructor(
		private readonly _connectToTablePageGQL: ConnectToTablePageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _getOrderById: GetOrderByIdGQL
	) {}

	ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		this.codeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((code) => {
			this._actionsService.setAction({
				label: "CONNECT_TO_TABLE",
				disabled: code?.toString().length !== 4,
				func: () => this.connectToTable(this.codeControl.value, this._routerService.getParams(PLACE_ID.slice(1)))
			});
		});

		this.codeControl.setValue(Number.parseInt(this._routerService.getQueryParams("code")));

		this._ordersService.activeOrderId$
			.pipe(
				take(1),
				filter((id) => Boolean(id)),
				switchMap((id) => this._getOrderById.fetch({ id: id! })),
				take(1)
			)
			.subscribe(async (result) => {
				if (result.data.order?.table?.code === this.codeControl.value) {
					await this._routerService.navigateByUrl(
						CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, result.data.order.id)
					);
				}
			});
	}

	connectToTable(code: number, placeId: string) {
		this._connectToTablePageGQL
			.mutate({ code, placeId })
			.pipe(
				take(1),
				filter((tableResult: any) => Boolean(tableResult.data)),
				switchMap((tableResult) =>
					this._ordersService.productsToOrders$.pipe(
						take(1),
						switchMap((productsToOrders) =>
							this._ordersService.createOrder({
								table: tableResult.data.getTableByCode.id,
								type: OrderTypeEnum.InPlace,
								place: placeId,
								productsToOrder: productsToOrders.map((productToOrder) => ({
									productId: productToOrder.productId,
									count: productToOrder.count,
									attributesIds: Object.values(productToOrder.attributesIds).flat()
								}))
							})
						)
					)
				),
				take(1)
			)
			.subscribe(
				async (orderResult) => {
					if (!orderResult.data) {
						return;
					}

					const order = orderResult.data.createOrder;

					await this._ordersService.setActiveOrderId(order.id);
					this._ordersService.setProductsToOrders([]);

					await this._routerService.navigateByUrl(
						CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
					);
				},
				(error) => {
					if (error.message === "1024") {
						this._dialogService
							.open(RedirectConfirmationComponent)
							.afterClosed$.pipe(
								take(1),
								filter((result) => Boolean(result))
							)
							.subscribe(async () => {
								await this._routerService.navigateByUrl(
									CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath.replace(PLACE_ID, placeId)
								);
							});
					} else {
						this._toastrService.error(undefined, {
							data: { title: "Стіл с таким кодом відсутній" }
						});
					}
				}
			);
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
