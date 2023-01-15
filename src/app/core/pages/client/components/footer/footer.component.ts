import { ChangeDetectionStrategy, Component } from "@angular/core";

import { ActionsService } from "../../../../../features/app";
import { CLIENT_ROUTES } from "../../../../../shared/constants";
import { BreadcrumbsService } from "../../../../../shared/modules/breadcrumbs";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	readonly clientRoutes = CLIENT_ROUTES;
	readonly breadcrumb$ = this._breadcrumbsService.breadcrumb$;
	readonly action$ = this._actionsService.action$;
	constructor(
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}
}
