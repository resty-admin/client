import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IStoreProductToOrder } from "@features/products";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import type { IProductInput, IProductOutput } from "../interfaces";

interface IProductClicked {
	product: IProductInput;
	productToOrder?: IStoreProductToOrder;
}
@Component({
	selector: "app-preview-product",
	templateUrl: "./preview-product.component.html",
	styleUrls: ["./preview-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IStoreProductToOrder>();
	@Output() plusClicked = new EventEmitter<IProductOutput>();
	@Output() productClicked = new EventEmitter<IProductClicked>();
	@Input() product?: IProductInput | null;
	productsWithAttributes: any[] = [];
	productWithoutAttributes: any;

	constructor(readonly sharedService: SharedService) {}

	ngOnChanges(changes: ISimpleChanges<PreviewProductComponent>) {
		if (!changes.product) {
			return;
		}

		const { currentValue: product } = changes.product;

		this.productWithoutAttributes = (product?.productsToOrders || []).find(
			(productToOrder) => Object.keys(productToOrder.attributesIds).length === 0
		);

		this.productsWithAttributes = (product?.productsToOrders || []).filter(
			(productToOrder) => Object.keys(productToOrder.attributesIds).length
		);
	}

	emitMinusClick(productToOrder: IStoreProductToOrder) {
		this.minusClicked.emit(productToOrder);
	}

	emitPlusClick(product: IProductInput, attributesIds: IStoreProductToOrder["attributesIds"] = {}) {
		this.plusClicked.emit({ productId: product.id, attributesIds, count: 1 });
	}

	emitProductClicked(data: IProductClicked) {
		this.productClicked.emit(data);
	}
}
