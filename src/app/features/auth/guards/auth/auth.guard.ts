import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { map } from "rxjs";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import type { IActivatedRouteSnapshot } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";

import type { UserRoleEnum } from "../../../../../graphql";
import { UserStatusEnum } from "../../../../../graphql";
import { AuthService } from "../../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(private readonly _authService: AuthService, private readonly _routerService: RouterService) {}

	canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot<{ roles: UserRoleEnum[] }>) {
		const { fragment, queryParamMap } = activatedRouteSnapshot;

		return this._authService.me$.pipe(
			map((user) => {
				if (user && user.status === UserStatusEnum.Verified) {
					return true;
				}

				const url =
					queryParamMap.get("from") === "telegram"
						? CLIENT_ROUTES.TELEGRAM.absolutePath
						: CLIENT_ROUTES.SIGN_IN.absolutePath;

				this._routerService.navigate([url], { ...(fragment ? { fragment } : {}) }).then();

				return false;
			})
		);
	}
}
