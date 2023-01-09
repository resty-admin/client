import { ChangeDetectionStrategy, Component } from "@angular/core";

import { ActionsService } from "../../../../../features/actions";
import { BreadcrumbsService } from "../../../../../shared/modules/breadcrumbs";
import { CLIENT_ROUTES } from "../../../../../shared/routes";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	readonly clientRoutes = CLIENT_ROUTES;
	readonly backUrl$ = this._breadcrumbsService.backUrl$;
	readonly action$ = this._actionsService.action$;
	constructor(
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}
}
