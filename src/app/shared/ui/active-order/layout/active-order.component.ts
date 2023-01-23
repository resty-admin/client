import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ACTIVE_ORDER_I18N } from "@shared/ui/active-order/constants";

import type { IActiveOrder } from "../interfaces";
import { ACTIVE_ORDER_PROVIDERS } from "../providers";

@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	providers: ACTIVE_ORDER_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent {
	readonly activeOrderI18n = ACTIVE_ORDER_I18N;
	@Input() activeOrder?: IActiveOrder | null;
	@Input() activeOrderLink: string = "";
}
