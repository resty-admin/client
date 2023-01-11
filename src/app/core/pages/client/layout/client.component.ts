import { ChangeDetectionStrategy, Component } from "@angular/core";
import { shareReplay } from "rxjs";

import { AsideService } from "../../../../features/app";
import { AuthService } from "../../../../features/auth/services";
import { OrdersService } from "../../../../features/orders";
import { CLIENT_ROUTES } from "../../../../shared/constants";
import { RouterService } from "../../../../shared/modules/router";
import type { IAction } from "../../../../shared/ui/actions";

@Component({
	selector: "app-client",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent {
	readonly isAsideOpen$ = this._asideService.isOpen$.pipe(shareReplay({ refCount: true }));

	readonly profileActions: IAction<any>[] = [
		{
			label: "Профиль",
			icon: "profile",
			func: async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.PROFILE.absolutePath);
			}
		},
		{
			label: "Выйти",
			icon: "exit",
			func: async () => {
				await this._authService.signOut();
			}
		}
	];

	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	readonly activeOrder$ = this._ordersService.activeOrder$;

	constructor(
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService,
		private readonly _ordersService: OrdersService
	) {}

	toggleAside() {
		this._asideService.toggleAside();
	}
}
