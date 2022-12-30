import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProductsService } from "src/app/features/products";

@Component({
	selector: "app-products-error",
	templateUrl: "./products-error.component.html",
	styleUrls: ["./products-error.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsErrorComponent {
	products$ = this._productsService.products$;

	constructor(private readonly _productsService: ProductsService) {}
}
