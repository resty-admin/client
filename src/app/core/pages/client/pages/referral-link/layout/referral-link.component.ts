import { Clipboard } from "@angular/cdk/clipboard";
import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrderTypeEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { REFERRAL_LINK_PAGE } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-referral-link",
	templateUrl: "./referral-link.component.html",
	styleUrls: ["./referral-link.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralLinkComponent implements OnInit, OnDestroy {
	readonly referralLinkPage = REFERRAL_LINK_PAGE;
	readonly activeOrder$: Observable<any> = this._activatedRoute.data.pipe(map((data) => data["activeOrder"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _toastrService: ToastrService,
		private readonly _clipboard: Clipboard
	) {}

	copyCode(code: number) {
		this._clipboard.copy(code.toString());

		this._toastrService.success(undefined, { data: { title: "Успешно скопировано" } });
	}

	ngOnInit() {
		this.activeOrder$.pipe(untilDestroyed(this)).subscribe((order: any) => {
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
			}[order.type as OrderTypeEnum];

			const label = {
				[OrderTypeEnum.Reserve]: "Выбрать стол",
				[OrderTypeEnum.Pickup]: "Выбрать блюда",
				[OrderTypeEnum.Delivery]: "Выбрать блюда",
				[OrderTypeEnum.InPlace]: "Выбрать блюда"
			}[order.type as OrderTypeEnum];

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
