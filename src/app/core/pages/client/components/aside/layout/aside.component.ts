import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { getI18nProvider } from "../../../../../../shared/i18n";
import { PAGES } from "../../../data";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	providers: [getI18nProvider("aside", (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Input() user?: any | null = null;
	@Input() activeOrder: any;

	readonly clientRoutes = CLIENT_ROUTES;

	readonly pages = PAGES;

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
