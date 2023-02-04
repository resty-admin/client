import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ISimpleChanges } from "@shared/interfaces";

@Component({
	selector: "app-basket",
	templateUrl: "./basket.component.html",
	styleUrls: ["./basket.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnChanges {
	@Input() productsToOrders: any[] | null = [];
	@Input() link = "";

	count = 0;

	ngOnChanges(changes: ISimpleChanges<BasketComponent>) {
		if (!changes.productsToOrders) {
			return;
		}

		this.count = (changes.productsToOrders.currentValue || []).reduce(
			(count, productToOrder) => count + productToOrder.count,
			0
		);
	}
}
