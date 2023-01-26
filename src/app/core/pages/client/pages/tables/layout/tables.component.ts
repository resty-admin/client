import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TABLES_PAGE_I18N } from "@core/pages/client/pages/tables/constants";
import { ActionsService } from "@features/app";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, HALL_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	readonly tablesPagei18n = TABLES_PAGE_I18N;

	readonly tables$: any = this._activatedRoute.data.pipe(map((data) => data["tables"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId)
		});

		const hallId = this._routerService.getParams(HALL_ID.slice(1));

		if (!hallId) {}

		// await this._tablesPageQuery.setVariables({
		// 	filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
		// });
	}

	trackByFn(index: number) {
		return index;
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
