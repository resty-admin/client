import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { UserRoleEnum } from "@graphql";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES, DYNAMIC_TOKEN } from "@shared/constants";
import { AUTH_TYPES } from "@shared/data";
import { RouterService } from "@shared/modules/router";
import { filter, take } from "rxjs";

export interface ISignUp {
	email: string;
	tel: string;
	password: string;
	role: UserRoleEnum;
}

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
	readonly roles = [UserRoleEnum.Admin, UserRoleEnum.Hostess, UserRoleEnum.Waiter, UserRoleEnum.Hookah].map((role) => ({
		label: role,
		value: role
	}));

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<ISignUp>({
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
				this.formGroup.patchValue({ role });
			});

		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.formGroup.get("email").disable();
			this.formGroup.get("tel").disable();

			this.formGroup.get(type).enable();
		});
	}

	signUp(body: ISignUp) {
		this._authService
			.signUp(body)
			.pipe(take(1))
			.subscribe(async (accessToken) => {
				if (!accessToken) {
					return;
				}

				await this._routerService.navigateByUrl(
					CLIENT_ROUTES.VERIFICATION_CODE.absolutePath.replace(DYNAMIC_TOKEN, accessToken)
				);
			});
	}
}
