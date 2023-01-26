import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-categories-skeleton",
	templateUrl: "./categories-skeleton.component.html",
	styleUrls: ["./categories-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSkeletonComponent {}
