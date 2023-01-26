import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM } from "@core/constants";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom } from "rxjs";

import { RESET_PASSWORD_PAGE } from "../constants";
import type { IResetPassword } from "../interfaces";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
	readonly resetPasswordPage = RESET_PASSWORD_PAGE;
	readonly clientRoutes = CLIENT_ROUTES;

	readonly form = FORM;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<IResetPassword>({
		password: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	async resetPassword(body: IResetPassword) {
		try {
			await lastValueFrom(this._authService.resetPassword(body));

			await this._routerService.navigateByUrl(CLIENT_ROUTES.SIGN_IN.absolutePath);
		} catch (error) {
			console.error(error);
		}
	}
}
