import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
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
		password: ["", Validators.required] as any
	});

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	resetPassword(body: IResetPassword) {
		this._authService.resetPassword(body).pipe(take(1)).subscribe();
	}
}
