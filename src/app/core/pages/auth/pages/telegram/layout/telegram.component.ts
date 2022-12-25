import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterRepository } from "@ngneat/elf-ng-router-store";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { AuthService } from "../../../services";

@UntilDestroy()
@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements OnInit {
	constructor(
		private readonly _router: Router,
		private readonly _routerRepository: RouterRepository,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._routerRepository
			.selectFragment()
			.pipe(
				untilDestroyed(this),
				map((value) => JSON.parse(new URLSearchParams(value).get("user") || "")),
				switchMap((telegramUser) => this._authService.telegram(telegramUser).pipe(take(1)))
			)
			.subscribe(async () => {
				await this._router.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
			});
	}
}
