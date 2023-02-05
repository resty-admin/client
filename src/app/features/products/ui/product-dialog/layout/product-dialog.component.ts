import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import type { ProductEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { UntilDestroy } from "@ngneat/until-destroy";
import { SharedService } from "@shared/services";

@UntilDestroy()
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
	readonly formGroup = new FormGroup({});
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

		for (const attrsGroup of product.attrsGroups) {
			this.formGroup.addControl(attrsGroup.name, new FormControl(""));
		}
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
			attributesIds: Object.values(this.formGroup.value).flat()
		});
	}
}
