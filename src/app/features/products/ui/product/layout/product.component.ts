import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";

import type { IProductInput, IProductOutput } from "../interfaces";
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IProductOutput>();
	@Output() plusClicked = new EventEmitter<IProductOutput>();
	@Input() product?: IProductInput | null;

	count = 0;

	ngOnChanges(changes: ISimpleChanges<ProductComponent>) {
		if (!changes.product || !changes.product.currentValue) {
			return;
		}

		console.log(changes.product?.currentValue?.productsToOrders);

		this.count = (this.product?.productsToOrders || []).reduce(
			(count, productToOrder) => count + productToOrder.count,
			0
		);
	}

	trackByFn(index: number) {
		return index;
	}

	emitMinusClick(productId: string) {
		this.minusClicked.emit({ productId, attributesIds: [] });
	}

	emitPlusClick(productId: string) {
		this.plusClicked.emit({ productId, attributesIds: [] });
	}
}
