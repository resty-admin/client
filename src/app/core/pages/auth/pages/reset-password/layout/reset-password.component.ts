import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { CLIENT_ROUTES, FORM } from "@shared/constants";
import { take } from "rxjs";

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

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	resetPassword(body: IResetPassword) {
		this._authService.resetPassword(body).pipe(take(1)).subscribe();
	}
}
