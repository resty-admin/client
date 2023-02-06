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
		const { product, productToOrder } = this._dialogRef.data || {};

		this.product = product;

		for (const attrsGroup of product?.attrsGroups || []) {
			this.formGroup.addControl(attrsGroup.name, new FormControl(productToOrder?.attributesIds[attrsGroup.name]));
		}

		if (!productToOrder) {
			return;
		}

		this.isEdit = true;
		this.count = productToOrder.count;
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
			attributesIds: Object.fromEntries(Object.entries(this.formGroup.value).filter(([_, val]) => Boolean(val)))
		});
	}
}
