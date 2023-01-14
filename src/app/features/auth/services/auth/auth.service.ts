import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { map, tap } from "rxjs";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { CryptoService } from "src/app/shared/modules/crypto";
import { JwtService } from "src/app/shared/modules/jwt";
import { RouterService } from "src/app/shared/modules/router";

import type {
	ForgotPasswordInput,
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	TelegramUserInput,
	UpdateMeInput,
	UserEntity
} from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import {
	DeleteMeGQL,
	ForgotPasswordGQL,
	GetMeGQL,
	GoogleGQL,
	ResetPasswordGQL,
	SignInGQL,
	SignUpGQL,
	TelegramGQL,
	UpdateMeGQL,
	VerifyCodeGQL
} from "../../graphql/auth";
import { AuthRepository } from "../../repositories";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	readonly getMeQuery = this._getMeGQL.watch();
	readonly me$ = this.getMeQuery.valueChanges.pipe(
		map((result) => this._jwtService.decodeToken<UserEntity>(result.data.getMe.accessToken))
	);

	constructor(
		private readonly _getMeGQL: GetMeGQL,
		private readonly _updateMeGQL: UpdateMeGQL,
		private readonly _deleteMeGQL: DeleteMeGQL,
		private readonly _signInGQL: SignInGQL,
		private readonly _signUpGQL: SignUpGQL,
		private readonly _telegramGQL: TelegramGQL,
		private readonly _verifyCodeGQL: VerifyCodeGQL,
		private readonly _forgotPasswordGQL: ForgotPasswordGQL,
		private readonly _resetPasswordGQL: ResetPasswordGQL,
		private readonly _googleGQL: GoogleGQL,
		private readonly _cryptoService: CryptoService,
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService
	) {}

	private _getBodyWithEncryptedPassword(body: any) {
		return { body: { ...body, password: this._cryptoService.encrypt(body.password) } };
	}

	private _updateAccessToken(): (source$: Observable<string | undefined>) => Observable<string | undefined> {
		return (source$) => source$.pipe(tap((accessToken) => this._authRepository.updateAccessToken(accessToken)));
	}

	updateAccessToken(accessToken?: string) {
		return this._authRepository.updateAccessToken(accessToken);
	}

	signIn(body: SignInInput) {
		return this._signInGQL.mutate(this._getBodyWithEncryptedPassword(body)).pipe(
			map((result) => result.data?.signIn.accessToken),
			this._updateAccessToken()
		);
	}

	signUp(body: SignUpInput) {
		return this._signUpGQL.mutate(this._getBodyWithEncryptedPassword(body)).pipe(
			map((result) => result.data?.signUp.accessToken),
			this._updateAccessToken()
		);
	}

	resetPassword(body: ResetPasswordInput) {
		return this._resetPasswordGQL.mutate({ body }).pipe(
			map((result) => result.data?.resetPassword.accessToken),
			this._updateAccessToken()
		);
	}

	forgotPassword(body: ForgotPasswordInput) {
		return this._forgotPasswordGQL.mutate({ body });
	}

	verifyCode(code: number) {
		return this._verifyCodeGQL.mutate({ code }).pipe(
			map((result) => result.data?.verifyCode.accessToken),
			this._updateAccessToken()
		);
	}

	telegram(telegramUser: TelegramUserInput) {
		return this._telegramGQL.mutate({ telegramUser }).pipe(
			map((result) => result.data?.telegram.accessToken),
			this._updateAccessToken()
		);
	}

	google(telegramUser: TelegramUserInput) {
		return this._googleGQL.mutate({ telegramUser }).pipe(
			map((result) => result.data?.telegram.accessToken),
			this._updateAccessToken()
		);
	}

	updateMe(user: UpdateMeInput) {
		return this._updateMeGQL.mutate({ user });
	}

	deleteMe() {
		return this._deleteMeGQL.mutate();
	}

	async signOut() {
		this._authRepository.updateUser(undefined);
		this.updateAccessToken(undefined);
		await this._routerService.navigateByUrl(CLIENT_ROUTES.SIGN_IN.absolutePath);
	}
}
