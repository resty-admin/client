import { Injectable } from "@angular/core";
import type {
	ForgotPasswordInput,
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	TelegramUserInput,
	UpdateMeInput,
	UserEntity
} from "@graphql";
import { CLIENT_ROUTES } from "@shared/constants";
import type { LanguagesEnum, ThemeEnum } from "@shared/enums";
import { CryptoService } from "@shared/modules/crypto";
import { JwtService } from "@shared/modules/jwt";
import { RouterService } from "@shared/modules/router";
import { resetStores } from "@shared/modules/store";
import type { Observable } from "rxjs";
import { catchError, map, of, tap } from "rxjs";

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
} from "../../graphql";
import { AuthRepository } from "../../repositories";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	readonly getMeQuery = this._getMeGQL.watch();
	readonly me$ = this.getMeQuery.valueChanges.pipe(
		map((result) => this._jwtService.decodeToken<UserEntity>(result.data.getMe.accessToken)),
		catchError(() => of(null))
	);

	readonly language$ = this._authRepository.language$;
	readonly accessToken$ = this._authRepository.accessToken$;
	readonly theme$ = this._authRepository.theme$;

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
		private readonly _routerService: RouterService
	) {
		// @ts-expect-error
		window["loginViaTelegram"] = (loginData) => this.loginViaTelegram(loginData);
	}

	private _getBodyWithEncryptedPassword<T extends { password: string }>(body: T) {
		return { body: { ...body, password: this._cryptoService.encrypt(body.password) } };
	}

	private _updateAccessToken(): (source$: Observable<string | undefined>) => Observable<string | undefined> {
		return (source$) => source$.pipe(tap((accessToken) => this.updateAccessToken(accessToken)));
	}

	private async loginViaTelegram(telegramUser: any) {
		await this._routerService.navigateByUrl(
			`${CLIENT_ROUTES.TELEGRAM.absolutePath}#user=${JSON.stringify(telegramUser)}`
		);
	}

	async updateAccessToken(accessToken?: string) {
		this._authRepository.updateAccessToken(accessToken);

		if (this.getMeQuery.getLastError()) {
			this.getMeQuery.resetLastResults();
		} else {
			await this.getMeQuery.refetch();
		}
	}

	updateTheme(theme: ThemeEnum) {
		this._authRepository.updateTheme(theme);
	}

	updateLanguage(language: LanguagesEnum) {
		this._authRepository.updateLanguage(language);
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

	signOut() {
		resetStores();
	}
}
