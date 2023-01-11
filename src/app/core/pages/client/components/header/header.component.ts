import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { CLIENT_ROUTES } from "../../../../../shared/constants";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
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
