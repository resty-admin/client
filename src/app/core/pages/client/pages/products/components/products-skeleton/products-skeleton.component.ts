import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-products-skeleton",
	templateUrl: "./products-skeleton.component.html",
	styleUrls: ["./products-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSkeletonComponent {}
