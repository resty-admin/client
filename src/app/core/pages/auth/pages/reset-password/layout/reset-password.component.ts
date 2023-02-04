import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { CLIENT_ROUTES } from "@shared/constants";
import { take } from "rxjs";

export interface IResetPassword {
	password: string;
}

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
	readonly clientRoutes = CLIENT_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<IResetPassword>({
		password: ""
	});

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	resetPassword(body: IResetPassword) {
		this._authService.resetPassword(body).pipe(take(1)).subscribe();
	}
}
