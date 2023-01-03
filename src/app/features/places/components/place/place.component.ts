import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-place",
	templateUrl: "./place.component.html",
	styleUrls: ["./place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceComponent {
	@Input() place?: any;
}
