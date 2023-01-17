import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { AuthService } from "../../../../../../features/auth/services";
import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { RouterService } from "../../../../../../shared/modules/router";

@Component({
	selector: "app-google",
	templateUrl: "./google.component.html",
	styleUrls: ["./google.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	async ngOnInit() {
		const googleUser = this._routerService.getParams();

		if (!googleUser) {
			return;
		}

		try {
			await lastValueFrom(this._authService.google(googleUser));

			await this._routerService.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
		} catch (error) {
			console.error(error);
		}
	}
}
