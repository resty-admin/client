import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { PRODUCTS_ERROR_PAGE } from "../constants";

@Component({
	selector: "app-products-error",
	templateUrl: "./products-error.component.html",
	styleUrls: ["./products-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorComponent {
	readonly productsErrorPage = PRODUCTS_ERROR_PAGE;
	readonly products$ = this._activatedRoute.data.pipe(map((data) => data["products"]));
	constructor(readonly sharedService: SharedService, private readonly _activatedRoute: ActivatedRoute) {}
}
