import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, lastValueFrom } from "rxjs";
import { CLIENT_ROUTES, DYNAMIC_TOKEN } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { UserRoleEnum } from "../../../../../../../graphql";
import type { IAuthType } from "../../../../../../features/auth/interfaces";
import { AuthService } from "../../../../../../features/auth/services";
import { FORM_I18N } from "../../../../../constants";
import { AUTH_TYPES } from "../../../data";
import { SIGN_UP_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly signUpPageI18n = SIGN_UP_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly types = AUTH_TYPES;
	readonly roles = [UserRoleEnum.Admin, UserRoleEnum.Hostess, UserRoleEnum.Waiter, UserRoleEnum.Hookah].map((role) => ({
		label: role,
		value: role
	}));

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group({
		email: "",
		tel: "",
		password: "",
		role: UserRoleEnum.Admin
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	ngOnInit() {
		this._routerService
			.selectQueryParams<UserRoleEnum>("role")
			.pipe(
				untilDestroyed(this),
				filter((role) => role && role in UserRoleEnum)
			)
			.subscribe((role) => {
				this.form.patchValue({ role });
			});

		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.form.get("email").disable();
			this.form.get("tel").disable();

			this.form.get(type).enable();
		});
	}

	async signUp(body: any) {
		const accessToken = await lastValueFrom(this._authService.signUp(body));

		if (!accessToken) {
			return;
		}

		await this._routerService.navigateByUrl(
			CLIENT_ROUTES.VERIFICATION_CODE.absolutePath.replace(DYNAMIC_TOKEN, accessToken)
		);
	}
}
