import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take } from "rxjs";

import { ActionsService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { RouterService } from "../../../../../../shared/modules/router";
import { FORM_I18N } from "../../../../../constants";
import { WELCOME_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
	readonly welcomePageI18n = WELCOME_PAGE_I18N;
	readonly formI18n = FORM_I18N;
	readonly nameControl = new FormControl<string>();

	constructor(
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._actionsService.setAction({
			label: "Подтвердить",
			action: () => this.updateUser()
		});

		this._authService
			.getMe()
			.pipe(untilDestroyed(this))
			.subscribe((me) => {
				if (!me) {
					return;
				}

				this.nameControl.setValue(me.name);
			});
	}

	updateUser() {
		this._authService.updateMe({ name: this.nameControl.value }).pipe(take(1)).subscribe();
	}
}
