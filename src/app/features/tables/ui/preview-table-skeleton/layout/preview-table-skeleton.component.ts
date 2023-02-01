import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-preview-table-skeleton",
	templateUrl: "./preview-table-skeleton.component.html",
	styleUrls: ["./preview-table-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTableSkeletonComponent {}
