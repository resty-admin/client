import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { ProductsErrorPageGQL } from "../graphql/products-error-page";

@Component({
	selector: "app-products-error",
	templateUrl: "./products-error.component.html",
	styleUrls: ["./products-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorComponent {
	private readonly _productsErrorPageQuery = this._productsErrorPageGQL.watch();
	readonly products$ = this._productsErrorPageQuery.valueChanges.pipe(map((result) => result.data.products.data));

	constructor(private readonly _productsErrorPageGQL: ProductsErrorPageGQL) {}
}
