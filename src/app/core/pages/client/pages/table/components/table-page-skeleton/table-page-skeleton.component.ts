import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-table-skeleton",
	templateUrl: "./table-page-skeleton.component.html",
	styleUrls: ["./table-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageSkeletonComponent {}
