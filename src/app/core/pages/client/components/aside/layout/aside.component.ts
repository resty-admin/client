import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { PAGES } from "../../../data";
import { ASIDE_I18N } from "../constants";
import { ASIDE_PROVIDERS } from "../providers";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	providers: ASIDE_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	readonly asideI18n = ASIDE_I18N;
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Input() user?: any | null = null;
	@Input() activeOrder: any;

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
