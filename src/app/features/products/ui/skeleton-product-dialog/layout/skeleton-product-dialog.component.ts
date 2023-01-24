import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-skeleton-product-dialog",
	templateUrl: "./skeleton-product-dialog.component.html",
	styleUrls: ["./skeleton-product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonProductDialogComponent {}
