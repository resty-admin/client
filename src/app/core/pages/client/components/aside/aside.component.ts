import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IUser } from "src/app/shared/interfaces";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	@Output() closeClicked = new EventEmitter();

	@Input() user?: IUser | null = null;

	readonly pages = [
		// {
		// 	label: "Профиль",
		// 	icon: "profile",
		// 	routerLink: "profile"
		// },
		{
			label: "Мои заказы",
			icon: "layers",
			routerLink: "orders"
		},
		{
			label: "Рестораны",
			icon: "places",
			routerLink: "places"
		},
		{
			label: "Вызов официанта",
			icon: "waiter",
			routerLink: "profile"
		},
		{
			label: "Вызов кальянщика",
			icon: "hookah",
			routerLink: "profile"
		}
	];

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
