import { Clipboard } from "@angular/cdk/clipboard";
import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { shareReplay } from "rxjs";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
import { PLACE_ID } from "../../../../../../shared/constants";
import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { BreadcrumbsService } from "../../../../../../shared/modules/breadcrumbs";
import { RouterService } from "../../../../../../shared/modules/router";
import { ToastrService } from "../../../../../../shared/ui/toastr";
import { REFERRAL_LINK_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-referral-link",
	templateUrl: "./referral-link.component.html",
	styleUrls: ["./referral-link.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralLinkComponent implements OnInit {
	readonly referralLinkPageI18n = REFERRAL_LINK_PAGE_I18N;
	readonly activeOrder$: Observable<any> = this._ordersService.activeOrder$.pipe(shareReplay({ refCount: true }));
	constructor(
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _toastrService: ToastrService,
		private readonly _clipboard: Clipboard
	) {}

	copyCode(code: string) {
		this._clipboard.copy(code);

		this._toastrService.show("Успешно скопировано");
	}

	ngOnInit() {
		this.activeOrder$.pipe(untilDestroyed(this)).subscribe((order) => {
			if (!order) {
				return;
			}

			this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, order.place.id));
			this._actionsService.setAction({
				label: "Добавить блюда",
				action: async () => {
					await this._routerService.navigateByUrl(
						CLIENT_ROUTES.CATEGORIES.absolutePath.replace(PLACE_ID, order.place.id)
					);
				}
			});
		});
	}
}
