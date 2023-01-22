import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IProductInput, IProductOutput } from "@features/products";

@Component({
	selector: "app-products-select",
	templateUrl: "./products-select.component.html",
	styleUrls: ["./products-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSelectComponent {
	@Output() plusClicked = new EventEmitter<IProductOutput>();
	@Output() minusClicked = new EventEmitter<IProductOutput>();
	@Output() productClicked = new EventEmitter<IProductInput>();
	@Input() products?: IProductInput[] | null;

	trackByFn(index: number) {
		return index;
	}

	emitProductClick(product: IProductInput) {
		this.productClicked.emit(product);
	}

	emitPlusClick(product: IProductOutput) {
		this.plusClicked.emit(product);
	}

	emitMinusClick(product: IProductOutput) {
		this.minusClicked.emit(product);
	}
}
