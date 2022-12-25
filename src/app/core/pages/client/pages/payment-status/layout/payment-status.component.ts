import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DYNAMIC_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@Component({
	selector: "app-payment-status",
	templateUrl: "./payment-status.component.html",
	styleUrls: ["./payment-status.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentStatusComponent {
	constructor(private readonly _routerService: RouterService) {}

	get backRouterLink() {
		return CLIENT_ROUTES.PAYMENT_TYPE.absolutePath.replace(
			DYNAMIC_ID,
			this._routerService.getParams(DYNAMIC_ID.slice(1)) || ""
		);
	}
}
