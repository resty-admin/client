import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IUser } from "src/app/shared/interfaces";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	@Output() burgerClicked = new EventEmitter();

	@Input() isAsideOpen = false;
	@Input() user?: IUser | null = null;

	readonly backUrl$ = this._breadcrumbsService.backUrl$;

	constructor(private readonly _breadcrumbsService: BreadcrumbsService) {}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
