import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-tables-skeleton",
	templateUrl: "./tables-skeleton.component.html",
	styleUrls: ["./tables-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSkeletonComponent {}
