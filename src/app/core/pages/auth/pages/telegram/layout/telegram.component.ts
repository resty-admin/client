import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom, map } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	ngOnInit() {
		this._routerService
			.selectFragment()
			.pipe(
				untilDestroyed(this),
				map((value) => JSON.parse(new URLSearchParams(value).get("user") || ""))
			)
			.subscribe(async (telegramUser) => {
				try {
					await lastValueFrom(this._authService.telegram(telegramUser));

					await this._routerService.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
				} catch (error) {
					console.error(error);
				}
			});
	}
}
