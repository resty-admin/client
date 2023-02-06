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

	readonly productToOrderPaidStatus = ProductToOrderPaidStatusEnum;

	ngOnChanges(changes: ISimpleChanges<ProductToOrderComponent>) {
		if (!changes.productToOrder) {
			return;
		}

		this.attributes = (changes.productToOrder.currentValue?.attributesToProduct || []).reduce(
			(str, attribute) => `${str} ${attribute.attribute.name}`,
			""
		);
	}
}
