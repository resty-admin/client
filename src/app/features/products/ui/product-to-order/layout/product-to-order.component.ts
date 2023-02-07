import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ProductToOrderPaidStatusEnum } from "@graphql";
import type { ISimpleChanges } from "@shared/interfaces";

import type { IProductToOrderInput } from "../interfaces";

@Component({
	selector: "app-product-to-order",
	templateUrl: "./product-to-order.component.html",
	styleUrls: ["./product-to-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToOrderComponent implements OnChanges {
	@Input() productToOrder?: IProductToOrderInput | null;
	@Input() isActive = false;

	attributes = "";

	price = 0;
	readonly productToOrderPaidStatus = ProductToOrderPaidStatusEnum;

	ngOnChanges(changes: ISimpleChanges<ProductToOrderComponent>) {
		if (!changes.productToOrder) {
			return;
		}

		const productToOrder = changes.productToOrder.currentValue;

		this.price =
			(productToOrder?.attributesToProduct || []).reduce((pre, curr) => pre + curr.attribute.price * curr.count, 0) +
			(productToOrder?.count || 0) * (productToOrder?.product.price || 0);

		this.attributes = (productToOrder?.attributesToProduct || []).reduce(
			(str, attribute) => `${str} ${attribute.attribute.name}`,
			""
		);
	}
}
