import { ChangeDetectionStrategy, Component } from "@angular/core";

import { BreadcrumbsService } from "../../../../../shared/modules/breadcrumbs";
import { FooterService } from "../../services";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	readonly backUrl$ = this._breadcrumbsService.backUrl$;
	readonly action$ = this._footerService.action$;
	constructor(
		private readonly _footerService: FooterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}
}
