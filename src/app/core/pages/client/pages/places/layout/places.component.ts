import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { PlacesPageGQL } from "../graphql";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit, OnDestroy {
	private readonly _placesPageQuery = this._placesPageGQL.watch();
	readonly places$ = this._placesPageQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		readonly sharedService: SharedService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _placesPageGQL: PlacesPageGQL
	) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "CONNECT_TO_ORDER",
			func: () => this._routerService.navigateByUrl(CLIENT_ROUTES.CONNECT_TO_ORDER.absolutePath)
		});

		this._breadcrumbsService.setBreadcrumb(null);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
