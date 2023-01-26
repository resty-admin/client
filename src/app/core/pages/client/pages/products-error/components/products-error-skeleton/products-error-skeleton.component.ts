import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-products-error-skeleton",
	templateUrl: "./products-error-skeleton.component.html",
	styleUrls: ["./products-error-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorSkeletonComponent {}
