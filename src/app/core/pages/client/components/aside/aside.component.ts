import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { AuthService } from "../../../../../features/auth/services";
import { OrdersService } from "../../../../../features/orders";
import { CLIENT_ROUTES } from "../../../../../shared/constants";
import { PAGES } from "../../data";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	@Output() closeClicked = new EventEmitter();

	@Input() user?: any | null = null;

	readonly clientRoutes = CLIENT_ROUTES;

	readonly pages = PAGES;
	readonly activeOrder$ = this._ordersService.activeOrder$;

	constructor(private readonly _ordersService: OrdersService, private readonly _authService: AuthService) {}

	async signOut() {
		await this._authService.signOut();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
