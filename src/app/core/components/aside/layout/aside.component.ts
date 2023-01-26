import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { SharedService } from "@shared/services";

import { PAGES } from "../../../pages/client/data";
import { ASIDE } from "../constants";
import type { IAsideUser } from "../interfaces";
import type { IAsideActiveOrder } from "../interfaces";
import { ASIDE_PROVIDERS } from "../providers";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	providers: ASIDE_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	readonly orderId = ORDER_ID;
	readonly aside = ASIDE;
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Input() user?: IAsideUser | null;
	@Input() activeOrder?: IAsideActiveOrder | null;

	readonly clientRoutes = CLIENT_ROUTES;

	readonly pages = PAGES;

	constructor(readonly sharedService: SharedService) {}

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
