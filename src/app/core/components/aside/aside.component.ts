import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { PAGES } from "@shared/data";
import type { IAsideActiveOrder, IAsideUser } from "@shared/interfaces";
import { SharedService } from "@shared/services";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	readonly orderId = ORDER_ID;
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
