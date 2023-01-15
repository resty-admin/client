import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { IEmit } from "../../../../../../../features/products";

@Component({
	selector: "app-products-select",
	templateUrl: "./products-select.component.html",
	styleUrls: ["./products-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSelectComponent {
	@Output() plusClicked = new EventEmitter<IEmit>();
	@Output() minusClicked = new EventEmitter<IEmit>();
	@Input() products?: any[] | null;

	emitPlusClick(emit: IEmit) {
		this.plusClicked.emit(emit);
	}

	emitMinusClick(emit: IEmit) {
		this.minusClicked.emit(emit);
	}
}
