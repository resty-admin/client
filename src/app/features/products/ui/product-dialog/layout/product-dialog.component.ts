import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import type { ProductEntity } from "@graphql";
import type { AttributesEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
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

	totalPrice = 0;
	readonly formGroup = new FormGroup({});
	constructor(readonly sharedService: SharedService, private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		const { product, productToOrder } = this._dialogRef.data || {};

		this.product = product;

		for (const attrsGroup of product?.attrsGroups || []) {
			this.formGroup.addControl(attrsGroup.name, new FormControl(productToOrder?.attributesIds[attrsGroup.name]));
		}

		this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
			this.calculatePrice();
		});

		this.count = productToOrder?.count || 0;

		this.calculatePrice();
		this.refreshDisableStatus();

		this.isEdit = Boolean(productToOrder);
	}

	calculatePrice() {
		const productAttributes = (this.product?.attrsGroups || []).reduce<AttributesEntity[]>(
			(_attributes, attrGroup) => [..._attributes, ...(attrGroup?.attributes || [])],
			[]
		);
		const attributesPrice = Object.values(this.formGroup.value)
			.flat()
			.map((id) => productAttributes.find((attr) => attr.id === id))
			.reduce((pre, curr) => pre + (curr?.price || 0), 0);

		this.totalPrice = this.count * (this.product?.price || 0) + attributesPrice;
	}

	refreshDisableStatus() {
		if (this.count) {
			this.formGroup.enable();
		} else {
			this.formGroup.disable();
		}
	}

	removeProductFromOrder() {
		this.count -= 1;
		this.calculatePrice();
		this.refreshDisableStatus();
	}

	addProductToOrder() {
		this.count += 1;
		this.calculatePrice();
		this.refreshDisableStatus();
	}

	closeDialog() {
		this._dialogRef.close({
			...this.product,
			count: this.count,
			attributesIds: Object.fromEntries(Object.entries(this.formGroup.value).filter(([_, val]) => Boolean(val)))
		});
	}
}
