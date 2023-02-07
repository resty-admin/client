import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ORDER_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { filter, map, switchMap, take } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-connect-to-order",
	templateUrl: "./connect-to-order.component.html",
	styleUrls: ["./connect-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToOrderComponent implements OnInit, OnDestroy {
	codeControl = new FormControl<number>();

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

		this.codeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((code) => {
			this._actionsService.setAction({
				label: "CONNECT_TO_ORDER",
				disabled: code?.toString().length !== 4,
				func: () => {
					this._ordersService
						.addUserToOrder(Number.parseInt(`${code}`))
						.pipe(
							take(1),
							map((result) => result.data?.addUserToOrder),
							filter((result) => Boolean(result)),
							switchMap((order) =>
								this._ordersService.productsToOrders$.pipe(
									switchMap((productsToOrder) =>
										this._ordersService.confirmProductsToOrders(
											productsToOrder.map((productToOrder) => ({
												productId: productToOrder.productId,
												count: productToOrder.count,
												attributesIds: Object.values(productToOrder.attributesIds).flat(),
												orderId: order!.id
											}))
										)
									),
									map(() => order)
								)
							)
						)
						.subscribe(async (order) => {
							await this._ordersService.setActiveOrderId(order!.id);
							this._ordersService.setProductsToOrders([]);

							await this._routerService.navigateByUrl(
								CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, order!.id)
							);
						});
				}
			});
		});

		this.codeControl.setValue(this._routerService.getQueryParams("code"));
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
