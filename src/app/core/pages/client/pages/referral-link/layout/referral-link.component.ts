import { Clipboard } from "@angular/cdk/clipboard";
import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, switchMap } from "rxjs";

import { REFERRAL_LINK_PAGE_I18N } from "../constants";
import { ReferralLinkPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-referral-link",
	templateUrl: "./referral-link.component.html",
	styleUrls: ["./referral-link.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralLinkComponent implements OnInit, OnDestroy {
	readonly referralLinkPageI18n = REFERRAL_LINK_PAGE_I18N;
	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._referralLinkPageGQL.watch({ orderId: orderId! }).valueChanges),
		map((result) => result.data.order)
	);

	constructor(
		private readonly _referralLinkPageGQL: ReferralLinkPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _toastrService: ToastrService,
		private readonly _clipboard: Clipboard
	) {}

	copyCode(code: number) {
		this._clipboard.copy(code.toString());

		this._toastrService.show("Успешно скопировано");
	}

	ngOnInit() {
		this.activeOrder$.pipe(untilDestroyed(this)).subscribe((order) => {
			if (!order) {
				return;
			}

			this._breadcrumbsService.setBreadcrumb({
				routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, order.place.id)
			});

			const url = {
				[OrderTypeEnum.Reserve]: CLIENT_ROUTES.HALLS.absolutePath,
				[OrderTypeEnum.Pickup]: CLIENT_ROUTES.CATEGORIES.absolutePath,
				[OrderTypeEnum.Delivery]: CLIENT_ROUTES.CATEGORIES.absolutePath,
				[OrderTypeEnum.InPlace]: CLIENT_ROUTES.CATEGORIES.absolutePath
			}[order.type];

			const label = {
				[OrderTypeEnum.Reserve]: "Выбрать стол",
				[OrderTypeEnum.Pickup]: "Выбрать блюда",
				[OrderTypeEnum.Delivery]: "Выбрать блюда",
				[OrderTypeEnum.InPlace]: "Выбрать блюда"
			}[order.type];

			this._actionsService.setAction({
				label,
				func: async () => {
					await this._routerService.navigateByUrl(url.replace(PLACE_ID, order.place.id));
				}
			});
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
