import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import type { UserRoleEnum } from "src/app/shared/enums";
import { UserStatusEnum } from "src/app/shared/enums";
import type { IActivatedRouteSnapshot } from "src/app/shared/interfaces";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { AuthService } from "../../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot<{ roles: UserRoleEnum[] }>) {
		const { data, fragment, queryParamMap } = activatedRouteSnapshot;

		return this._authService.getMe().pipe(
			map((user) => {
				if (user && user.status === UserStatusEnum.VERIFIED && (data.roles || []).includes(user.role)) {
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
