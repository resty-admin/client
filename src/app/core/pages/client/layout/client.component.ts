import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { catchError, filter, lastValueFrom, map, of, switchMap, take } from "rxjs";

import { AsideService } from "../../../../features/app";
import { AuthService } from "../../../../features/auth/services";
import { OrdersService } from "../../../../features/orders";
import { CLIENT_ROUTES } from "../../../../shared/constants";
import { RouterService } from "../../../../shared/modules/router";
import type { IAction } from "../../../../shared/ui/actions";
import { ClientPageGQL } from "../graphql/client-page";

@Component({
	selector: "app-client",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit {
	readonly isAsideOpen$ = this._asideService.isOpen$;
	readonly user$ = this._authService.me$;
	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		filter((orderId) => Boolean(orderId)),
		switchMap((orderId) => this._clientPageGQL.watch({ orderId: orderId! }).valueChanges),
		map((result) => result.data.order),
		catchError(() => of(null))
	);

	readonly profileActions: IAction[] = [
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

	constructor(
		private readonly _clientPageGQL: ClientPageGQL,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService,
		private readonly _ordersService: OrdersService
	) {}

	async ngOnInit() {
		const user = await lastValueFrom(this._authService.me$.pipe(take(1)));

		if (user?.name) {
			return;
		}

		await this._routerService.navigateByUrl(CLIENT_ROUTES.WELCOME.absolutePath);
	}

	toggleAside() {
		this._asideService.toggleAside();
	}
}
