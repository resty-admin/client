import { Injectable } from "@angular/core";
import { catchError, map, of, take } from "rxjs";
import { ApiService } from "src/app/shared/modules/api";
import { CryptoService } from "src/app/shared/modules/crypto";
import { JwtService } from "src/app/shared/modules/jwt";

import type { UpdateMeInput } from "../../../../../../graphql";
import { CLIENT_ROUTES } from "../../../../../shared/constants";
import { RouterService } from "../../../../../shared/modules/router";
import { ToastrService } from "../../../../../shared/ui/toastr";
import { DeleteMeGQL, GetMeGQL, UpdateMeGQL } from "../../graphql/auth";
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
		private readonly _getMeGQL: GetMeGQL,
		private readonly _updateMeGQL: UpdateMeGQL,
		private readonly _deleteMeGQL: DeleteMeGQL,
		private readonly _toastrService: ToastrService
	) {}

	updateAccessToken(accessToken: string) {
		return this._authRepository.updateAccessToken(accessToken);
	}

	getMe() {
		return this._getMeGQL.watch().valueChanges.pipe(
			map((result) => this._jwtService.decodeToken<any>(result.data.getMe.accessToken)),
			catchError(() => of(undefined))
		);
	}

	updateMe(user: UpdateMeInput) {
		return this._updateMeGQL.mutate({ user }).pipe(take(1), this._toastrService.observe("Пользователь"));
	}

	deleteMe() {
		return this._deleteMeGQL.mutate().pipe(take(1), this._toastrService.observe("Пользователь"));
	}

	async signOut() {
		this._authRepository.updateUser(undefined);
		this._authRepository.updateAccessToken(undefined);
		await this._routerService.navigateByUrl(CLIENT_ROUTES.SIGN_IN.absolutePath);
	}
}
