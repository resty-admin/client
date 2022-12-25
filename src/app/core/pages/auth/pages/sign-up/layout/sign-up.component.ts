import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take } from "rxjs";
import { DYNAMIC_TOKEN } from "src/app/shared/constants";
import { UserRoleEnum } from "src/app/shared/enums";
import { CLIENT_ROUTES } from "src/app/shared/routes";
import { ToastrService } from "src/app/shared/ui/toastr";

import type { IAuthType } from "../../../interfaces";
import { AuthService } from "../../../services";
import { AUTH_TYPES } from "../../../utils";

@UntilDestroy()
@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
	readonly clientRoutes = CLIENT_ROUTES;
	readonly types = AUTH_TYPES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group({
		email: "",
		tel: "",
		password: "",
		role: UserRoleEnum.CLIENT
	});

	constructor(
		private readonly _router: Router,
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _toastrService: ToastrService
	) {}

	ngOnInit() {
		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.form.get("email").disable();
			this.form.get("tel").disable();

			this.form.get(type).enable();
		});
	}

	signUp(formValue: any) {
		this._authService
			.signUp(formValue)
			.pipe(take(1), this._toastrService.observe("Регистрация", "Вы успешно зарегестрировались"))
			.subscribe(async ({ accessToken }) => {
				await this._router.navigateByUrl(
					CLIENT_ROUTES.VERIFICATION_CODE.absolutePath.replace(DYNAMIC_TOKEN, accessToken)
				);
			});
	}
}
