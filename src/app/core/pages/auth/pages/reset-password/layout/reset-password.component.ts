import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";
import { CLIENT_ROUTES } from "src/app/shared/constants";

import type { IAuthType } from "../../../../../../features/auth/interfaces";
import { AuthService } from "../../../../../../features/auth/services";
import { RouterService } from "../../../../../../shared/modules/router";
import { RESET_PASSWORD_PAGE_I18N } from "../constants";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
	readonly resetPasswordPageI18n = RESET_PASSWORD_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<any>({
		password: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	async resetPassword(body: any) {
		try {
			await lastValueFrom(this._authService.resetPassword(body));

			await this._routerService.navigateByUrl(CLIENT_ROUTES.SIGN_IN.absolutePath);
		} catch (error) {
			console.error(error);
		}
	}
}
