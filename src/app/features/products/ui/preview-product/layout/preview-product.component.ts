import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";

import type { IProductInput, IProductOutput } from "../interfaces";
@Component({
	selector: "app-preview-product",
	templateUrl: "./preview-product.component.html",
	styleUrls: ["./preview-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IProductOutput>();
	@Output() plusClicked = new EventEmitter<IProductOutput>();
	@Input() product?: IProductInput | null;

	count = 0;

	constructor(readonly sharedService: SharedService) {}

	ngOnChanges(changes: ISimpleChanges<PreviewProductComponent>) {
		if (!changes.product || !changes.product.currentValue) {
			return;
		}

		this.count = (this.product?.productsToOrders || []).reduce(
			(count, productToOrder) => count + productToOrder.count,
			0
		);
	}

	emitMinusClick(productId: string) {
		this.minusClicked.emit({ productId, attributesIds: [], count: 1 });
	}

	emitPlusClick(productId: string) {
		this.plusClicked.emit({ productId, attributesIds: [], count: 1 });
	}
}
