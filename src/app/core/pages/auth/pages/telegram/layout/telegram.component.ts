import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
import { UserRoleEnum } from "@graphql";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	async ngOnInit() {
		const value = this._routerService.getFragment();

		if (!value) {
			await this._routerService.navigate([CLIENT_ROUTES.SIGN_UP.absolutePath], { queryParamsHandling: "merge" });
			return;
		}

		const telegramUser = JSON.parse(new URLSearchParams(value).get("user") || "");

		this._authService
			.telegram({
				added_to_attachment_menu: telegramUser.added_to_attachment_menu,
				first_name: telegramUser.first_name,
				id: telegramUser.id,
				is_bot: telegramUser.is_bot,
				is_premium: telegramUser.is_premium,
				language_code: telegramUser.language_code,
				last_name: telegramUser.last_name,
				username: telegramUser.username,
				role: UserRoleEnum.Client
			})
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
			});
	}
}
