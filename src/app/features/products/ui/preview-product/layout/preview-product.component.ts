import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { AttributesEntity } from "../../../../../../graphql";
import type { AtLeast, ISimpleChanges } from "../../../../../shared/interfaces";
import type { IPreviewProduct, IProductChanged } from "../interfaces";
import type { IProductToOrder } from "../interfaces/product-to-order.interface";
import type { IProductToOrderWithAttributes } from "../interfaces/product-to-order-with-attributes.interface";
@Component({
	selector: "app-preview-product",
	templateUrl: "./preview-product.component.html",
	styleUrls: ["./preview-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IProductChanged>();
	@Output() plusClicked = new EventEmitter<IProductChanged>();
	@Input() product?: IPreviewProduct | null;
	@Input() productsToOrders?: IProductToOrder[] = [];

	count = 0;

	productsToOrdersWithAttributes: IProductToOrderWithAttributes[] = [];

	trackByFn(index: number) {
		return index;
	}

	ngOnChanges(changes: ISimpleChanges<PreviewProductComponent>) {
		if (!changes.productsToOrders || !changes.productsToOrders.currentValue) {
			return;
		}

		const productsToOrders = changes.productsToOrders.currentValue || [];

		this.count = productsToOrders
			.filter((productToOrder) => (productToOrder.attributes || []).length === 0)
			.reduce((count, productToOrder) => count + productToOrder.count, 0);

		this.productsToOrdersWithAttributes = productsToOrders
			.filter((productToOrder) => (productToOrder.attributes || []).length)
			.map((productToOrder) => ({
				...productToOrder,
				attributesName: (productToOrder.attributes || []).reduce(
					(attributesName, attribute) => `${attributesName} ${attribute?.name || ""} (${attribute?.price} грн)`,
					""
				)
			}));
	}

	emitMinusClick(productId: string, attributes?: AtLeast<AttributesEntity, "id">[]) {
		const attributesIds = (attributes || []).map((attribute) => attribute.id);
		this.minusClicked.emit({ productId, attributesIds });
	}

	emitPlusClick(productId: string, attributes?: AtLeast<AttributesEntity, "id">[]) {
		const attributesIds = (attributes || []).map((attribute) => attribute.id);
		this.plusClicked.emit({ productId, attributesIds });
	}
}
