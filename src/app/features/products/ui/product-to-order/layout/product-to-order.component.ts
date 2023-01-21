import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ProductToOrderPaidStatusEnum } from "@graphql";

import type { IProductToOrder } from "../interfaces";

@Component({
	selector: "app-product-to-order",
	templateUrl: "./product-to-order.component.html",
	styleUrls: ["./product-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderComponent {
	@Input() productToOrder?: IProductToOrder | null;
	@Input() isActive = false;

	readonly productToOrderPaidStatus = ProductToOrderPaidStatusEnum;
}
