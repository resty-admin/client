import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

import { PLACES_PAGE_I18N } from "../constants";
import { PlacesPageGQL } from "../graphql";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit, OnDestroy {
	readonly placesPageI18n = PLACES_PAGE_I18N;
	private readonly _placesPageQuery = this._placesPageGQL.watch();
	readonly places$ = this._placesPageQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		private readonly _placesPageGQL: PlacesPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService
	) {}

	trackByFn(index: number) {
		return index;
	}

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
