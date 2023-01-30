import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { PRODUCTS_ERROR_PAGE } from "../constants";
import { ProductsErrorPageService } from "../services";

@Component({
	selector: "app-products-error",
	templateUrl: "./products-error.component.html",
	styleUrls: ["./products-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorComponent {
	readonly productsErrorPage = PRODUCTS_ERROR_PAGE;
	readonly products$ = this._productsErrorPageService.productsErrorPageQuery.valueChanges.pipe(
		map((result) => result.data.products.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _productsErrorPageService: ProductsErrorPageService
	) {}
}
