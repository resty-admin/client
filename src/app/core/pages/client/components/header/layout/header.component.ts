import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { HEADER_I18N } from "../constants";
import { HEADER_PROVIDERS } from "../providers";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	providers: HEADER_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	readonly headerI18n = HEADER_I18N;
	@Output() burgerClicked = new EventEmitter();

	@Input() isAsideOpen: any = false;
	@Input() user?: any | null = null;
	@Input() actions?: any = [];
	@Input() activeOrder: any;

	readonly clientRoutes = CLIENT_ROUTES;

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
