import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";

import { PAGES } from "../../../pages/client/data";
import { ASIDE_I18N } from "../constants";
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
	readonly asideI18n = ASIDE_I18N;
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Input() user?: IAsideUser | null;
	@Input() activeOrder?: IAsideActiveOrder | null;

	readonly clientRoutes = CLIENT_ROUTES;

	readonly pages = PAGES;

	trackByFn(index: number) {
		return index;
	}

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
