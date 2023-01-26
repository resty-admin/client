import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-confirm-products-skeleton",
	templateUrl: "./confirm-products-skeleton.component.html",
	styleUrls: ["./confirm-products-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmProductsSkeletonComponent {}
