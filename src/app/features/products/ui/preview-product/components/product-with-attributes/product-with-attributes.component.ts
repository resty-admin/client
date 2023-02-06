import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IStoreProductToOrder } from "@features/products";
import type { AttributesEntity } from "@graphql";
import type { ISimpleChanges } from "@shared/interfaces";

import { IProductInput } from "../../interfaces";

@Component({
	selector: "app-product-with-attributes",
	templateUrl: "./product-with-attributes.component.html",
	styleUrls: ["./product-with-attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductWithAttributesComponent implements OnChanges {
	@Input() product?: IProductInput;
	@Input() productToOrder?: IStoreProductToOrder;
	@Output() minusClicked = new EventEmitter<IStoreProductToOrder>();
	@Output() plusClicked = new EventEmitter<IProductInput>();

	@Output() productCLicked = new EventEmitter<{ product: IProductInput; productToOrder: IStoreProductToOrder }>();

	count = 0;
	attributes = "";

	ngOnChanges(changes: ISimpleChanges<ProductWithAttributesComponent>) {
		if (!changes.productToOrder || !changes.product) {
			return;
		}

		const attributes: any = (this.product?.attrsGroups || [])
			.reduce<AttributesEntity[]>((_attributes, attrGroup) => [..._attributes, ...(attrGroup?.attributes || [])], [])
			.reduce((attributesMap, attribute) => ({ ...attributesMap, [attribute.id]: attribute.name }), {});

		this.attributes = attributes.length;

		this.attributes = Object.values(this.productToOrder?.attributesIds || {})
			.flat()
			.reduce((str, id) => `${str} ${attributes[id]},`, "")
			.slice(0, -1);
	}

	emitMinusClick(productToOrder: IStoreProductToOrder) {
		this.minusClicked.emit(productToOrder);
	}

	emitPlusClick(product: IProductInput) {
		this.plusClicked.emit(product);
	}

	emitProductClick(product: IProductInput, productToOrder: IStoreProductToOrder) {
		this.productCLicked.emit({ product, productToOrder });
	}
}
