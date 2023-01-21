import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM_I18N } from "@core/constants";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom } from "rxjs";

import { AUTH_TYPES } from "../../../data";
import { SIGN_IN_PAGE_I18N } from "../constants";
import type { ISignIn } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.component.html",
	styleUrls: ["./sign-in.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly signInPageI18n = SIGN_IN_PAGE_I18N;
	readonly clientRoutes = CLIENT_ROUTES;
	readonly types = AUTH_TYPES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<ISignIn>({
		email: "",
		tel: "",
		password: ""
	});

	constructor(
		private readonly _routerService: RouterService,
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.form.get("email").disable();
			this.form.get("tel").disable();

			this.form.get(type).enable();
		});
	}

	async signIn(body: ISignIn) {
		try {
			await lastValueFrom(this._authService.signIn(body));
		} catch (error) {
			console.error(error);
		}

		await this._routerService.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
	}
}
