import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";

import type { IConfirmProductInput, IConfirmProductOutput } from "../interfaces";
@Component({
	selector: "app-confirm-product",
	templateUrl: "./confrim-product.component.html",
	styleUrls: ["./confrim-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfrimProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IConfirmProductOutput>();
	@Output() plusClicked = new EventEmitter<IConfirmProductOutput>();
	@Input() product?: IConfirmProductInput | null;

	count = 0;

	ngOnChanges(changes: ISimpleChanges<ConfrimProductComponent>) {
		if (!changes.product || !changes.product.currentValue) {
			return;
		}

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
