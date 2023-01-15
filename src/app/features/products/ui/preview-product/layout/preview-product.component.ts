import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import type { ProductEntity, UserToOrderEntity } from "../../../../../../graphql";
import type { ISimpleChanges } from "../../../../../shared/interfaces";
import { DeepAtLeast } from "../../../../../shared/interfaces";

export interface IEmit {
	productId: string;
	attributesIds: string[];
}

@Component({
	selector: "app-preview-product",
	templateUrl: "./preview-product.component.html",
	styleUrls: ["./preview-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductComponent implements OnChanges {
	@Output() minusClicked = new EventEmitter<IEmit>();
	@Output() plusClicked = new EventEmitter<IEmit>();
	@Input() product?: DeepAtLeast<ProductEntity, "id">;
	@Input() usersToOrders?: DeepAtLeast<UserToOrderEntity, "count">[] = [];

	count = 0;

	usersToProductsWithAttributes: any[] = [];

	trackByFn(index: number) {
		return index;
	}

	ngOnChanges(changes: ISimpleChanges<PreviewProductComponent>) {
		if (!changes.usersToOrders || !changes.usersToOrders.currentValue) {
			return;
		}

		const usersToOrders = changes.usersToOrders.currentValue || [];

		this.count = usersToOrders
			.filter((userToOrder) => (userToOrder.attributes || []).length === 0)
			.reduce((count, userToOrder) => count + userToOrder.count, 0);

		this.usersToProductsWithAttributes = usersToOrders
			.filter((userToOrder) => (userToOrder.attributes || []).length)
			.map((userToOrder) => ({
				...userToOrder,
				attributesName: (userToOrder.attributes || []).reduce(
					(attributesName, attribute) => `${attributesName} ${attribute?.name || ""} (${attribute?.price} грн)`,
					""
				)
			}));
	}

	emitMinusClick(productId: string, attributes?: any) {
		const attributesIds = (attributes || []).map((attribute: any) => attribute.id);
		this.minusClicked.emit({ productId, attributesIds });
	}

	emitPlusClick(productId: string, attributes?: any) {
		const attributesIds = (attributes || []).map((attribute: any) => attribute.id);
		this.plusClicked.emit({ productId, attributesIds });
	}
}
