import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CLIENT_ROUTES, ORDER_ID } from "@shared/constants";
import { PAGES } from "@shared/data";
import type { IAsideActiveOrder, IAsideUser } from "@shared/interfaces";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { take } from "rxjs";

import { DemoComponent } from "../../pages/client/components";

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

	constructor(readonly sharedService: SharedService, private readonly _dialogService: DialogService) {}

	openDemo() {
		this._dialogService.open(DemoComponent).afterClosed$.pipe(take(1)).subscribe();
	}

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
