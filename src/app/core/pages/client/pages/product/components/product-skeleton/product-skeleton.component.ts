import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-product-skeleton",
	templateUrl: "./product-skeleton.component.html",
	styleUrls: ["./product-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSkeletonComponent {}
