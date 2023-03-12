import { Clipboard } from "@angular/cdk/clipboard";
import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ORDER_ID, PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import { map, take } from "rxjs";

import { ReferralLinkPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-referral-link",
	templateUrl: "./referral-link.component.html",
	styleUrls: ["./referral-link.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralLinkComponent implements OnInit, OnDestroy {
	private readonly _referralLinkPageQuery = this._referralLinkPageGQL.watch();

	readonly order$ = this._referralLinkPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(
		private readonly _referralLinkPageGQL: ReferralLinkPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _toastrService: ToastrService,
		private readonly _clipboard: Clipboard
	) {}

	async ngOnInit() {
		await this._referralLinkPageQuery.setVariables({
			orderId: this._routerService.getParams(ORDER_ID.slice(1))
		});

		this.order$.pipe(take(1)).subscribe((order) => {
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
				[OrderTypeEnum.InPlace]: CLIENT_ROUTES.CATEGORIES.absolutePath,
				[OrderTypeEnum.OutOfPlace]: CLIENT_ROUTES.CATEGORIES.absolutePath
			}[order.type];

			const label = {
				[OrderTypeEnum.Reserve]: "SELECT_TABLE",
				[OrderTypeEnum.Pickup]: "SELECT_PRODUCTS",
				[OrderTypeEnum.Delivery]: "SELECT_PRODUCTS",
				[OrderTypeEnum.InPlace]: "SELECT_PRODUCTS",
				[OrderTypeEnum.OutOfPlace]: "SELECT_PRODUCTS"
			}[order.type];

			this._actionsService.setAction({
				label,
				func: () => this._routerService.navigateByUrl(url.replace(PLACE_ID, order.place.id))
			});
		});
	}

	copyCode(code: number) {
		this._clipboard.copy(code.toString());

		this._toastrService.success(undefined, { data: { title: "Скопійовано" } });
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
		this._actionsService.setAction(null);
	}
}
