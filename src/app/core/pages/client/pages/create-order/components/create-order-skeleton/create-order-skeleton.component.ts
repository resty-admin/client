import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-create-order-skeleton",
	templateUrl: "./create-order-skeleton.component.html",
	styleUrls: ["./create-order-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderSkeletonComponent {}
