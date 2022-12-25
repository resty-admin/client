import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { take } from "rxjs";
import type { IResetPassword } from "src/app/shared/interfaces";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import type { IAuthType } from "../../../interfaces";
import { AuthService } from "../../../services";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
	readonly clientRoutes = CLIENT_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<IResetPassword>({
		password: ""
	});

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	resetPassword(formValue: IResetPassword) {
		this._authService.resetPassword(formValue).pipe(take(1)).subscribe();
	}
}
