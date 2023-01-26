import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM } from "@core/constants";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { FormControl } from "@ngneat/reactive-forms";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom } from "rxjs";

import { WELCOME_PAGE } from "../constants";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit, OnDestroy {
	readonly welcomePage = WELCOME_PAGE;
	readonly form = FORM;
	readonly nameControl = new FormControl<string>();

	constructor(
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "Подтвердить",
			func: async () => {
				try {
					await lastValueFrom(this._authService.updateMe({ name: this.nameControl.value }));

					await this._authService.getMeQuery.refetch();
					await this._routerService.navigateByUrl(CLIENT_ROUTES.PLACES.absolutePath);
				} catch (error) {
					console.error(error);
				}
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
