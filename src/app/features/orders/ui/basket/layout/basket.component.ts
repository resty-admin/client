import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";

import { BAKSET } from "../constants";
import { BAKSET_PROVIDERS } from "../providers";

@Component({
	selector: "app-basket",
	templateUrl: "./basket.component.html",
	styleUrls: ["./basket.component.scss"],
	providers: BAKSET_PROVIDERS,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnChanges {
	readonly basket = BAKSET;

	@Input() productsToOrders: any[] | null = [];
	@Input() link = "";

	count = 0;

	ngOnChanges(changes: ISimpleChanges<BasketComponent>) {
		if (!changes.productsToOrders) {
			return;
		}

		console.log(changes.productsToOrders.currentValue);

		this.count = (changes.productsToOrders.currentValue || []).reduce(
			(count, productToOrder) => count + productToOrder.count,
			0
		);
	}
}
