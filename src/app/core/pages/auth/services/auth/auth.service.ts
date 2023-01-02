import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { catchError, map, of, tap } from "rxjs";
import { AUTH_ENDPOINTS } from "src/app/shared/endpoints";
import type {
	IAccessToken,
	IForgotPassword,
	IResetPassword,
	ISignIn,
	ISignUp,
	IUser,
	IVerifyCode
} from "src/app/shared/interfaces";
import type { ITelegramUser } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { CryptoService } from "src/app/shared/modules/crypto";
import { JwtService } from "src/app/shared/modules/jwt";

import { RouterService } from "../../../../../shared/modules/router";
import { CLIENT_ROUTES } from "../../../../../shared/routes";
import { GetMeGQL } from "../../pages/graphql/auth";
import { AuthRepository } from "../../repositories";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	readonly store$ = this._authRepository.store$;

	constructor(
		private readonly _apiService: ApiService,
		private readonly _cryptoService: CryptoService,
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService,
		private readonly _routerService: RouterService,
		private readonly _getMeGQL: GetMeGQL
	) {}

	private _encryptPassword<T extends { password: string }>(body: T) {
		return { ...body, password: this._cryptoService.encrypt(body.password) };
	}

	private _updateAccessToken(): (source$: Observable<IAccessToken>) => Observable<IAccessToken> {
		return (source$) =>
			source$.pipe(
				tap(({ accessToken }) => {
					this._authRepository.updateAccessToken(accessToken);
				})
			);
	}

	updateAccessToken(accessToken: string) {
		return this._authRepository.updateAccessToken(accessToken);
	}

	getMe() {
		return this._getMeGQL.watch().valueChanges.pipe(
			map((result) => this._jwtService.decodeToken<IUser>(result.data.getMe.accessToken)),
			catchError(() => of(undefined))
		);
	}

	signIn(body: ISignIn) {
		return this._apiService
			.post<IAccessToken>(AUTH_ENDPOINTS.SIGN_IN, this._encryptPassword(body))
			.pipe(this._updateAccessToken());
	}

	signUp(body: ISignUp) {
		return this._apiService
			.post<IAccessToken>(AUTH_ENDPOINTS.SIGN_UP, this._encryptPassword(body))
			.pipe(this._updateAccessToken());
	}

	async signOut() {
		this._authRepository.updateUser(undefined);
		this._authRepository.updateAccessToken(undefined);
		await this._routerService.navigateByUrl(CLIENT_ROUTES.SIGN_IN.absolutePath);
	}

	verifyCode(body: IVerifyCode) {
		return this._apiService.post<IAccessToken>(AUTH_ENDPOINTS.VERIFY_CODE, body).pipe(this._updateAccessToken());
	}

	forgotPassword(body: IForgotPassword) {
		return this._apiService.post<IAccessToken>(AUTH_ENDPOINTS.FORGOT_PASSWOR, body).pipe(this._updateAccessToken());
	}

	resetPassword(body: IResetPassword) {
		return this._apiService.post<IAccessToken>(AUTH_ENDPOINTS.RESET_PASSWOR, body).pipe(this._updateAccessToken());
	}

	telegram(telegramUser: ITelegramUser) {
		return this._apiService.post<IAccessToken>(AUTH_ENDPOINTS.TELEGRAM, telegramUser).pipe(this._updateAccessToken());
	}
}
