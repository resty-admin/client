import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-preview-table",
	templateUrl: "./preview-table.component.html",
	styleUrls: ["./preview-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTableComponent {
	@Input() table: any;
}
