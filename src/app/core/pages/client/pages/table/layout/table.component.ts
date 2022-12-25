import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { switchMap } from "rxjs";
import { DYNAMIC_ID, HALL_ID, PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { TablesService } from "src/app/shared/modules/tables";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@UntilDestroy()
@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
	table$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._tablesService.getTable(id)));

	constructor(
		private readonly _routerService: RouterService,
		private readonly _tablesService: TablesService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId, hallId }) => {
				this._breadcrumbsService.setBackUrl(
					CLIENT_ROUTES.TABLES.absolutePath.replace(PLACE_ID, placeId).replace(HALL_ID, hallId)
				);
			});
	}
}
