import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { PLACES_PAGE } from "../constants";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit, OnDestroy {
	readonly placesPage = PLACES_PAGE;
	readonly places$: any = this._activatedRoute.data.pipe(map((data) => data["places"]));

	constructor(
		readonly sharedService: SharedService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "Подключиться к заказу",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath);
			}
		});

		this._breadcrumbsService.setBreadcrumb(null);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
