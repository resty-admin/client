import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { FormControl } from "@ngneat/reactive-forms";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit, OnDestroy {
	readonly nameControl = new FormControl<string>();

	constructor(
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "CONFIRM",
			func: () =>
				this._authService
					.updateMe({ name: this.nameControl.value })
					.pipe(take(1))
					.subscribe(async () => {
						await this._authService.getMeQuery.refetch();
						await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
					})
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
