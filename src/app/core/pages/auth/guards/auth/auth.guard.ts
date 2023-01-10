import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import type { IActivatedRouteSnapshot } from "src/app/shared/interfaces";

import { AuthService } from "../../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot<{ roles: any[] }>) {
		const { fragment, queryParamMap } = activatedRouteSnapshot;

		return this._authService.getMe().pipe(
			map((user) => {
				if (user && user.status === "VERIFIED") {
					return true;
				}

				const url =
					queryParamMap.get("from") === "telegram"
						? CLIENT_ROUTES.TELEGRAM.absolutePath
						: CLIENT_ROUTES.SIGN_IN.absolutePath;

				this._router.navigate([url], { ...(fragment ? { fragment } : {}) }).then();

				return false;
			})
		);
	}
}
