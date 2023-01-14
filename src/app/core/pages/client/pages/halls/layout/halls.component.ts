import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { HALLS_PAGE_I18N } from "../constants";
import { HallsPageGQL } from "../graphql/halls-page";

@UntilDestroy()
@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	readonly hallsPageI18n = HALLS_PAGE_I18N;
	private readonly _hallsPageQuery = this._hallsPageGQL.watch();
	readonly halls$ = this._hallsPageQuery.valueChanges.pipe(map((result) => result.data.halls.data));

	constructor(
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, placeId));
				await this._hallsPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
			});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBackUrl(null);
	}
}
