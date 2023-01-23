import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-skeleton-product",
	templateUrl: "./skeleton-product.component.html",
	styleUrls: ["./skeleton-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonProductComponent {}
