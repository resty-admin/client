import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { PLACES_PAGE } from "../constants";
import { PlacesPageService } from "../services";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit, OnDestroy {
	readonly placesPage = PLACES_PAGE;
	readonly places$ = this._placesPageService.placesPageQuery.valueChanges.pipe(
		map((result) => result.data.places.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _placesPageService: PlacesPageService
	) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "Подключиться к заказу",
			func: () => this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath)
		});

		this._breadcrumbsService.setBreadcrumb(null);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
