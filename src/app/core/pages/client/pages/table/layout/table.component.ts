import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, HALL_ID, ORDER_ID, PLACE_ID, TABLE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { IosDatepickerDialogComponent } from "@shared/ui/ios-datepicker-dialog";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Observable } from "rxjs";
import { BehaviorSubject, catchError, filter, lastValueFrom, map, of, shareReplay, switchMap, take, tap } from "rxjs";

import { TABLE_PAGE_I18N } from "../constants";
import { IsTableAvailableForReserveGQL, TablePageGQL, TablePageOrderGQL } from "../graphql";

export type IValidationStatus = "invalid" | "loading" | "valid";

@UntilDestroy()
@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
	readonly tablePageI18n = TABLE_PAGE_I18N;
	private readonly _tablePageQuery = this._tablePageGQL.watch();
	readonly table$: Observable<any> = this._activatedRoute.data.pipe(map((data) => data["table"]));
	private readonly _dateSubject = new BehaviorSubject<Dayjs | undefined>(undefined);
	readonly date$ = this._dateSubject.asObservable().pipe(shareReplay({ refCount: true }));

	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._tablePageOrderGQL.watch({ orderId }).valueChanges),
		map((result) => result.data.order)
	);

	validationStatus?: "invalid" | "loading" | "valid";

	startDate?: Dayjs;

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _tablePageGQL: TablePageGQL,
		private readonly _tablePageOrderGQL: TablePageOrderGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _isTableAvailableForReserveGQL: IsTableAvailableForReserveGQL,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _dialogService: DialogService
	) {}

	async openIosDatepicker() {
		const date: Dayjs | undefined = await lastValueFrom(
			this._dialogService.open(IosDatepickerDialogComponent, {
				data: this._dateSubject.value,
				windowClass: "ios-datepicker-dialog"
			}).afterClosed$
		);

		if (!date) {
			return;
		}

		this._dateSubject.next(date);
	}

	async ngOnInit() {
		const { placeId, hallId, tableId } = this._routerService.getParams();

		if (!tableId) {
			return;
		}

		await this._tablePageQuery.setVariables({ tableId });

		this.date$
			.pipe(
				filter((date) => Boolean(date) && !dayjs(date).isSame(this.startDate)),
				tap(() => {
					this.changeValidationStatus("loading");
				}),
				switchMap((date) =>
					this._isTableAvailableForReserveGQL.watch({ body: { date: date?.format(), tableId } }).valueChanges.pipe(
						take(1),
						map(() => true),
						catchError(() => of(false))
					)
				)
			)
			.subscribe((isValid) => {
				this.changeValidationStatus(isValid ? "valid" : "invalid");
			});

		this.setAction();
		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.HALL.absolutePath.replace(PLACE_ID, placeId).replace(HALL_ID, hallId)
		});

		this.activeOrder$.pipe(untilDestroyed(this)).subscribe((order) => {
			if (!order) {
				return;
			}

			this.startDate = dayjs(order.startDate);

			this._dateSubject.next(this.startDate);
		});
	}

	setAction() {
		const tableId = this._routerService.getParams(TABLE_ID.slice(1));

		if (!tableId) {
			return;
		}

		this._actionsService.setAction({
			label: "Подтвердить",
			disabled: !this._dateSubject.getValue() || this.validationStatus !== "valid",
			func: async () => {
				const activeOrderId =
					(await lastValueFrom(this._ordersService.activeOrderId$.pipe(take(1)))) ||
					(await lastValueFrom(
						this._ordersService
							.createOrder({
								place: this._routerService.getParams(PLACE_ID.slice(1)),
								type: OrderTypeEnum.Reserve
							})
							.pipe(map((result) => result.data?.createOrder.id))
					));

				if (!activeOrderId) {
					return;
				}

				const tableResult = await lastValueFrom(this._ordersService.addTableToOrder(activeOrderId, tableId));

				if (!tableResult.data) {
					return;
				}

				const { id } = tableResult.data.addTableToOrder;

				await this._routerService.navigateByUrl(CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, id));
			}
		});
	}

	changeValidationStatus(validatinStatus: IValidationStatus) {
		this.validationStatus = validatinStatus;
		this.setAction();
		this._changeDetectorRef.detectChanges();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
