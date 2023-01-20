import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { IProductChanged, IProductToSelect } from "../interfaces";

@Component({
	selector: "app-products-select",
	templateUrl: "./products-select.component.html",
	styleUrls: ["./products-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSelectComponent {
	@Output() plusClicked = new EventEmitter<IProductChanged>();
	@Output() minusClicked = new EventEmitter<IProductChanged>();
	@Output() productClicked = new EventEmitter<IProductToSelect>();
	@Input() products?: IProductToSelect[] | null;

	trackByFn(index: number) {
		return index;
	}

	emitProductClick(product: IProductToSelect) {
		this.productClicked.emit(product);
	}

	emitPlusClick(productChanged: IProductChanged) {
		this.plusClicked.emit(productChanged);
	}

	emitMinusClick(productChanged: IProductChanged) {
		this.minusClicked.emit(productChanged);
	}
}
