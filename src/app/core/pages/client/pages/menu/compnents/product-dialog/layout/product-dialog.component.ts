import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { map } from "rxjs";

import type { ProductEntity } from "../../../../../../../../../graphql";
import type { DeepAtLeast } from "../../../../../../../../shared/interfaces";
import { FORM_I18N } from "../../../../../../../constants";
import { PRODUCT_PAGE_I18N } from "../constants";
import { ProductPageGQL } from "../graphql/product-page";

@UntilDestroy()
@Component({
	selector: "app-product-dialog",
	templateUrl: "./product-dialog.component.html",
	styleUrls: ["./product-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDialogComponent implements OnInit {
	readonly productPageI18n = PRODUCT_PAGE_I18N;
	readonly formI18n = FORM_I18N;
	private readonly _productPageQuery = this._productsPageGQL.watch();
	readonly attributesFormControl = new FormControl<string>();
	readonly product$ = this._productPageQuery.valueChanges.pipe(
		map((result) => result.data.product),
		map((product) => ({
			...product,
			attrsGroups: product.attrsGroups?.map((attrGroup) => ({
				...attrGroup,
				attributes: attrGroup.attributes?.map((attr) => ({
					...attr,
					value: attr.id,
					label: attr.name
				}))
			}))
		}))
	);

	data!: DeepAtLeast<ProductEntity, "id">;

	constructor(private readonly _dialogRef: DialogRef, private readonly _productsPageGQL: ProductPageGQL) {}

	trackByFn(index: number) {
		return index;
	}

	closeDialogWithData(product: any, attributes: any) {
		this._dialogRef.close({ product, attributes });
	}

	async ngOnInit() {
		this.data = this._dialogRef.data;

		await this._productPageQuery.setVariables({ productId: this.data.id });
	}
}
