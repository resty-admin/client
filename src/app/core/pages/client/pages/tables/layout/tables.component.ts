import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { TABLES_PAGE_I18N } from "../constants";
import { TablesPageGQL } from "../graphql/tables-page";

@UntilDestroy()
@Component({
	selector: "app-tables",
	templateUrl: "./tables.component.html",
	styleUrls: ["./tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit, OnDestroy {
	readonly tablesPageI18n = TABLES_PAGE_I18N;
	private readonly _tablesPageQuery = this._tablesPageGQL.watch();
	readonly tables$: Observable<any> = this._tablesPageQuery.valueChanges.pipe(map((result) => result.data.tables.data));

	constructor(
		private readonly _tablesPageGQL: TablesPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(async ({ placeId, hallId }) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, placeId));
				await this._tablesPageQuery.setVariables({ filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }] });
			});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBackUrl(null);
	}
}
