import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IUser } from "src/app/shared/interfaces";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

import { RouterService } from "../../../../../shared/modules/router";
import { CLIENT_ROUTES } from "../../../../../shared/routes";
import type { IAction } from "../../../../../shared/ui/actions";
import { AuthService } from "../../../auth/services";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	@Output() burgerClicked = new EventEmitter();

	@Input() isAsideOpen = false;
	@Input() user?: IUser | null = null;

	readonly backUrl$ = this._breadcrumbsService.backUrl$;

	readonly actions: IAction<IUser>[] = [
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
		private readonly _authService: AuthService
	) {}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
