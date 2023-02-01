import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { HALLS_PAGE } from "../constants";
import { HallsPageService } from "../services";

@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit, OnDestroy {
	readonly hallsPage = HALLS_PAGE;
	readonly halls$ = this._hallsPageService.hallsPageQuery.valueChanges.pipe(map((result) => result.data.halls.data));

	constructor(
		readonly sharedService: SharedService,
		private readonly _hallsPageService: HallsPageService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(
				PLACE_ID,
				this._routerService.getParams(PLACE_ID.slice(1))
			)
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
