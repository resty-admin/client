import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { DYNAMIC_TOKEN } from "src/app/shared/constants";
import type { IActivatedRouteSnapshot } from "src/app/shared/interfaces";
import { JwtService } from "src/app/shared/modules/jwt";
import { CLIENT_ROUTES } from "src/app/shared/routes";

// Check if DYNAMIC_TOKEN of route is jwt
@Injectable({ providedIn: "root" })
export class JwtGuard implements CanActivate {
	constructor(private readonly _router: Router, private readonly _jwtService: JwtService) {}

	async canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot) {
		const token = activatedRouteSnapshot.paramMap.get(DYNAMIC_TOKEN.slice(1));

		console.log(token);
		try {
			this._jwtService.decodeToken(token || "");
		} catch {
			await this._router.navigateByUrl(CLIENT_ROUTES.SIGN_IN.absolutePath);
			return false;
		}

		return true;
	}
}
