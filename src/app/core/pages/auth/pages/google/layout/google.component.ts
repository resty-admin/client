import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
import { ACCESS_TOKEN, CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";

@Component({
	selector: "app-google",
	templateUrl: "./google.component.html",
	styleUrls: ["./google.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	async ngOnInit() {
		const accessToken = this._routerService.getParams(ACCESS_TOKEN);

		await this._authService.updateAccessToken(accessToken);

		await this._routerService.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
	}
}
