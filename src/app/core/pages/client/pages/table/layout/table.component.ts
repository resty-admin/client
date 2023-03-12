import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, DAYJS_DISPLAY_FORMAT, HALL_ID, ORDER_ID, PLACE_ID, TABLE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { IosDatepickerDialogComponent } from "@shared/ui/ios-datepicker-dialog";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { BehaviorSubject, filter, map, of, shareReplay, startWith, switchMap, take, tap } from "rxjs";

import type { TablePageQuery } from "../graphql";
import { IsTableAvailableForReserveGQL, TablePageOrderGQL } from "../graphql";

export type IValidationStatus = "INVALID" | "LOADING" | "VALID";

@UntilDestroy()
@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
	readonly dayjsDisplayFormat = DAYJS_DISPLAY_FORMAT;
	table: TablePageQuery["table"] | null = null;
	private readonly _dateSubject = new BehaviorSubject<Dayjs | undefined>(dayjs());
	readonly date$ = this._dateSubject.asObservable().pipe(shareReplay({ refCount: true }));

	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._tablePageOrderGQL.watch({ orderId }).valueChanges),
		map((result) => result.data.order)
	);

	startDate?: Dayjs;

	validationStatus: "INVALID" | "LOADING" | "VALID" = "LOADING";

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _tablePageOrderGQL: TablePageOrderGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _isTableAvailableForReserveGQL: IsTableAvailableForReserveGQL,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.table = this._activatedRoute.snapshot.data["table"];

		const { placeId, hallId, tableId } = this._routerService.getParams();

		if (!tableId) {
			return;
		}

		this.setAction();

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.HALL.absolutePath.replace(PLACE_ID, placeId).replace(HALL_ID, hallId)
		});

		this.activeOrder$
			.pipe(
				startWith(null),
				untilDestroyed(this),
				tap((order) => {
					if (!order) {
						return;
					}

					this.startDate = dayjs(order.startDate);

					this._dateSubject.next(this.startDate);
				}),
				switchMap(() =>
					this._isTableAvailableForReserveGQL.fetch({
						tableId: this._routerService.getParams(TABLE_ID.slice(1)),
						date: this._dateSubject.getValue()?.utcOffset(0).format()
					})
				)
			)
			.subscribe(
				() => {
					this.validationStatus = "VALID";
					this._changeDetectorRef.detectChanges();
					this.setAction();
				},
				() => {
					this.validationStatus = "INVALID";
				}
			);
	}

	openIosDatepicker() {
		this._dialogService
			.open(IosDatepickerDialogComponent, {
				data: { place: { id: this._routerService.getParams(PLACE_ID.slice(1)) }, table: this.table },
				windowClass: "ios-datepicker-dialog"
			})
			.afterClosed$.pipe(take(1))
			.subscribe((date) => {
				if (!date) {
					return;
				}

				this._dateSubject.next(date);
				this.validationStatus = "VALID";
				this.setAction();
			});
	}

	setAction() {
		const tableId = this._routerService.getParams(TABLE_ID.slice(1));

		if (!tableId) {
			return;
		}

		this._actionsService.setAction({
			label: "CONFIRM",
			disabled: !this._dateSubject.getValue() || this.validationStatus === "INVALID",
			func: async () => {
				this._ordersService.activeOrderId$
					.pipe(take(1))
					.pipe(
						take(1),
						switchMap((orderId) =>
							orderId
								? of(orderId)
								: this._ordersService
										.createOrder({
											place: this._routerService.getParams(PLACE_ID.slice(1)),
											type: OrderTypeEnum.Reserve,
											table: this._routerService.getParams(TABLE_ID.slice(1)),
											startDate: this._dateSubject.getValue()
										})
										.pipe(map((result) => result.data?.createOrder.id))
						),
						take(1),
						filter((activeOrderId) => Boolean(activeOrderId)),
						switchMap((activeOrderId) => this._ordersService.addTableToOrder(activeOrderId!, tableId)),
						take(1)
					)
					.subscribe(async (tableResult) => {
						if (!tableResult.data?.addTableToOrder.id) {
							return;
						}

						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, tableResult.data.addTableToOrder.id)
						);
					});
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
