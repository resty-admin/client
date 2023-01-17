import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { ProductEntity, ProductToOrderEntity } from "../../../../../../graphql";
import type { ISimpleChanges } from "../../../../../shared/interfaces";
import { DeepAtLeast } from "../../../../../shared/interfaces";

export interface IEmit {
	productId: string;
	attributesIds: string[];
}

@Component({
	selector: "app-preview-product",
	templateUrl: "./preview-product.component.html",
	styleUrls: ["./preview-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IEmit>();
	@Output() plusClicked = new EventEmitter<IEmit>();
	@Input() product?: DeepAtLeast<ProductEntity, "id">;
	@Input() productsToOrders?: DeepAtLeast<ProductToOrderEntity, "count">[] = [];

	count = 0;

	usersToProductsWithAttributes: any[] = [];

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

		this.usersToProductsWithAttributes = productsToOrders
			.filter((productToOrder) => (productToOrder.attributes || []).length)
			.map((productToOrder) => ({
				...productToOrder,
				attributesName: (productToOrder.attributes || []).reduce(
					(attributesName, attribute) => `${attributesName} ${attribute?.name || ""} (${attribute?.price} грн)`,
					""
				)
			}));
	}

	emitMinusClick(productId: string, attributes?: any) {
		const attributesIds = (attributes || []).map((attribute: any) => attribute.id);
		this.minusClicked.emit({ productId, attributesIds });
	}

	emitPlusClick(productId: string, attributes?: any) {
		const attributesIds = (attributes || []).map((attribute: any) => attribute.id);
		this.plusClicked.emit({ productId, attributesIds });
	}
}
