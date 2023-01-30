import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-products-error-skeleton",
	templateUrl: "./products-error-page-skeleton.component.html",
	styleUrls: ["./products-error-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorPageSkeletonComponent {}
