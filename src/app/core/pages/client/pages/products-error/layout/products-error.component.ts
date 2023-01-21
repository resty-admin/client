import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { PRODUCTS_ERROR_PAGE_I18N } from "../constants";
import { ProductsErrorPageGQL } from "../graphql";

@Component({
	selector: "app-products-error",
	templateUrl: "./products-error.component.html",
	styleUrls: ["./products-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorComponent {
	readonly productsErrorPageI18n = PRODUCTS_ERROR_PAGE_I18N;
	private readonly _productsErrorPageQuery = this._productsErrorPageGQL.watch();
	readonly products$ = this._productsErrorPageQuery.valueChanges.pipe(map((result) => result.data.products.data));

	constructor(private readonly _productsErrorPageGQL: ProductsErrorPageGQL) {}

	trackByFn(index: number) {
		return index;
	}
}
