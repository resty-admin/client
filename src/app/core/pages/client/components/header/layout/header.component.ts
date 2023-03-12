import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { CLIENT_ROUTES, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import type { IAction } from "@shared/ui/actions";

import type { IHeaderActiveOrder, IHeaderUser } from "../interfaces";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
	readonly orderId = ORDER_ID;
	@Output() burgerClicked = new EventEmitter();
	@Input() isAsideOpen?: boolean | null;
	@Input() user?: IHeaderUser | null;
	@Input() activeOrder?: IHeaderActiveOrder | null;
	@Input() productsToOrders: any[] | null = [];
	@Input() activePlaceId?: string | null = "";

	@Input() actions?: IAction[] | null = [];

	activeOrderLink = "";
	basketLink = "";

	readonly clientRoutes = CLIENT_ROUTES;

	ngOnChanges(changes: ISimpleChanges<HeaderComponent>) {
		if (changes.activeOrder) {
			const { currentValue } = changes.activeOrder;
			this.activeOrderLink = currentValue
				? CLIENT_ROUTES.ACTIVE_ORDER.absolutePath.replace(ORDER_ID, currentValue.id)
				: "";
		}

		if (changes.activePlaceId) {
			this.basketLink = CLIENT_ROUTES.CONFIRM_PRODUCTS.absolutePath.replace(
				PLACE_ID,
				changes.activePlaceId.currentValue || ""
			);
		}
	}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
