import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HallsService } from "src/app/features/halls";
import { PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@UntilDestroy()
@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit {
	readonly halls$ = this._hallsService.halls$;

	constructor(
		private readonly _hallsService: HallsService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams<{ placeId: string }>()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId }) => {
				this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.DASHBOARD.absolutePath.replace(PLACE_ID, placeId));
			});
	}
}
