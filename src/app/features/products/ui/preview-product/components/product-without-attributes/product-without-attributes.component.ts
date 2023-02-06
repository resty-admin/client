import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IStoreProductToOrder } from "@features/products";

import { IProductInput } from "../../interfaces";

@Component({
	selector: "app-product-without-attributes",
	templateUrl: "./product-without-attributes.component.html",
	styleUrls: ["./product-without-attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductWithoutAttributesComponent {
	@Input() product?: IProductInput;
	@Input() productToOrder?: IStoreProductToOrder;
	@Output() minusClicked = new EventEmitter<IStoreProductToOrder>();
	@Output() plusClicked = new EventEmitter<IProductInput>();
	@Output() productCLicked = new EventEmitter<{ product: IProductInput; productToOrder?: IStoreProductToOrder }>();

	emitMinusClick(productToOrder?: IStoreProductToOrder) {
		this.minusClicked.emit(productToOrder);
	}

	emitPlusClick(product: IProductInput) {
		this.plusClicked.emit(product);
	}

	emitProductClick(product: IProductInput, productToOrder?: IStoreProductToOrder) {
		this.productCLicked.emit({ product, productToOrder });
	}
}
