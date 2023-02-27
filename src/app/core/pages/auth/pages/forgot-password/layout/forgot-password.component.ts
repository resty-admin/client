import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import { AUTH_TYPES } from "@shared/data";
import type { IRadioButtonOption } from "@shared/ui/radio-button";
import { ToastrService } from "@shared/ui/toastr";
import { take } from "rxjs";

export interface IForgotPassword {
	email: string;
	tel: string;
}

@UntilDestroy()
@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
	readonly clientRoutes = CLIENT_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<IForgotPassword>({
		email: ["", Validators.required] as any,
		tel: ["", Validators.required] as any
	});

	readonly types: IRadioButtonOption[] = AUTH_TYPES;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _toastrService: ToastrService
	) {}

	ngOnInit() {
		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.formGroup.get("email").disable();
			this.formGroup.get("tel").disable();

			this.formGroup.get(type).enable();
		});
	}

	forgotPassword(body: IForgotPassword) {
		this._authService
			.forgotPassword(body)
			.pipe(take(1))
			.subscribe(() => {
				this._toastrService.success(undefined, { data: { title: "Ми відіслали Вам ссилку на пошту" } });
			});
	}
}
