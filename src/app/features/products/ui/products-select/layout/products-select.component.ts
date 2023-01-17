import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { IEmit } from "../../../index";

@Component({
	selector: "app-products-select",
	templateUrl: "./products-select.component.html",
	styleUrls: ["./products-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSelectComponent {
	@Output() plusClicked = new EventEmitter<IEmit>();
	@Output() minusClicked = new EventEmitter<IEmit>();
	@Output() productClicked = new EventEmitter<any>();
	@Input() products?: any[] | null;

	trackByFn(index: number) {
		return index;
	}

	emitProductClick(product: any) {
		this.productClicked.emit(product);
	}

	emitPlusClick(emit: IEmit) {
		this.plusClicked.emit(emit);
	}

	emitMinusClick(emit: IEmit) {
		this.minusClicked.emit(emit);
	}
}
