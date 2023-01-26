import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { AsideService } from "@features/app";
import { AuthService } from "@features/auth";
import { OrdersService } from "@features/orders";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";
import { catchError, filter, lastValueFrom, map, of, shareReplay, startWith, switchMap, take, tap } from "rxjs";

import { CorePageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-core",
	templateUrl: "./core.component.html",
	styleUrls: ["./core.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnInit {
	readonly isAsideOpen$ = this._asideService.isOpen$;
	readonly user$ = this._authService.me$.pipe(
		filter((user) => Boolean(user)),
		shareReplay({ refCount: true })
	);

	readonly activePlaceId$ = this._ordersService.activePlaceId$.pipe(shareReplay({ refCount: true }));

	readonly productsToOrders$ = this.activePlaceId$.pipe(
		switchMap((placeId) =>
			this._ordersService.productsToOrders$.pipe(
				map((productsToOrders) => productsToOrders.filter((productToOrder) => productToOrder.placeId === placeId))
			)
		)
	);

	readonly activeOrder$ = this._ordersService.activeOrderId$.pipe(
		switchMap((orderId) =>
			orderId
				? this._clientPageGQL.watch({ orderId }).valueChanges.pipe(
						map((result) => result.data.order),
						catchError(() => of(null))
				  )
				: of(null)
		),
		tap(() => {
			this._changeDetectorRef.detectChanges();
		})
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

	readonly isClient$ = this._router.events.pipe(
		untilDestroyed(this),
		startWith(this._router),
		filter((event) => event instanceof NavigationStart),
		map((event) => !(event as NavigationStart).url.includes("/auth")),
		shareReplay({ refCount: true })
	);

	constructor(
		private readonly _clientPageGQL: CorePageGQL,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService,
		private readonly _ordersService: OrdersService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _router: Router
	) {}

	async ngOnInit() {
		const user = await lastValueFrom(this.user$.pipe(take(1)));

		if (!user || user.name) {
			return;
		}

		await this._routerService.navigateByUrl(CLIENT_ROUTES.WELCOME.absolutePath);
	}

	toggleAside() {
		this._asideService.toggleAside();
	}
}
