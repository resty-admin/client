import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

import { AuthService } from "../../../../../features/auth/services";
import { OrdersService } from "../../../../../features/orders";
import { CLIENT_ROUTES } from "../../../../../shared/constants";
import { RouterService } from "../../../../../shared/modules/router";
import type { IAction } from "../../../../../shared/ui/actions";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	readonly clientRoutes = CLIENT_ROUTES;
	@Output() burgerClicked = new EventEmitter();

	@Input() isAsideOpen = false;
	@Input() user?: any | null = null;

	readonly backUrl$ = this._breadcrumbsService.backUrl$;

	readonly activeOrder$ = this._ordersService.activeOrder$;

	readonly actions: IAction<any>[] = [
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
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _ordersService: OrdersService
	) {}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
