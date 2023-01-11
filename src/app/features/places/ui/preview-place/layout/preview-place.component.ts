import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-preview-place",
	templateUrl: "./preview-place.component.html",
	styleUrls: ["./preview-place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewPlaceComponent {
	@Input() place?: any;
}
