import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { ProductEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import { SharedService } from "@shared/services";

@Component({
	selector: "app-product-dialog",
	templateUrl: "./product-dialog.component.html",
	styleUrls: ["./product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
	product?: ProductEntity;
	count = 0;

	isEdit = false;
	readonly attributesFormControl = new FormControl<string[]>();
	constructor(readonly sharedService: SharedService, private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		const { product, productsToOrders } = this._dialogRef.data || {};

		if (productsToOrders) {
			this.isEdit = true;
		}

		this.product = product;
		this.count = (productsToOrders || []).reduce(
			(count: number, productToOrder: { count: number }) => count + productToOrder.count,
			0
		);
	}

	removeProductFromOrder() {
		this.count -= 1;
	}

	addProductToOrder() {
		this.count += 1;
	}

	closeDialog() {
		this._dialogRef.close({
			...this.product,
			count: this.count,
			attributesIds: []
		});
	}
}
