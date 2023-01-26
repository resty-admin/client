import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { PRODUCTS_ERROR_PAGE_I18N } from "../constants";

@Component({
	selector: "app-products-error",
	templateUrl: "./products-error.component.html",
	styleUrls: ["./products-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorComponent {
	readonly productsErrorPageI18n = PRODUCTS_ERROR_PAGE_I18N;
	readonly products$ = this._activatedRoute.data.pipe(map((data) => data["products"]));
	constructor(private readonly _activatedRoute: ActivatedRoute) {}

	trackByFn(index: number) {
		return index;
	}
}
