import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { CLIENT_ROUTES, ORDER_ID } from "../../../../../../shared/constants";
import type { ISimpleChanges } from "../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../shared/ui/actions";
import { HEADER_I18N } from "../constants";
import type { IHeaderActiveOrder, IHeaderUser } from "../interfaces";
import { HEADER_PROVIDERS } from "../providers";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	providers: HEADER_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
	readonly orderId = ORDER_ID;
	readonly headerI18n = HEADER_I18N;
	@Output() burgerClicked = new EventEmitter();
	@Input() isAsideOpen?: boolean | null;
	@Input() user?: IHeaderUser | null;
	@Input() activeOrder?: IHeaderActiveOrder | null;

	@Input() actions?: IAction[] | null = [];

	activeOrderLink = "";

	readonly clientRoutes = CLIENT_ROUTES;

	constructor(private readonly _routerService: RouterService) {}

	ngOnChanges(changes: ISimpleChanges<HeaderComponent>) {
		if (changes.activeOrder && changes.activeOrder.currentValue) {
			this.activeOrderLink = CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(
				ORDER_ID,
				changes.activeOrder.currentValue.id
			);
		}
	}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
