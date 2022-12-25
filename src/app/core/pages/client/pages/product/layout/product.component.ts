import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { switchMap } from "rxjs";
import { CATEGORY_ID, DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { ProductsService } from "src/app/shared/modules/products";
import { RouterService } from "src/app/shared/modules/router";
import { CLIENT_ROUTES } from "src/app/shared/routes";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
	readonly counterFormControl = new FormControl(0);

	readonly product$ = this._routerService
		.selectParams(DYNAMIC_ID.slice(1))
		.pipe(switchMap((id) => this._productsService.getProduct(id)));

	readonly ingridients = [
		{ value: "empty", label: "Ничего" },
		{ value: "chicken", label: "Курица (40г) + 30 грн" },
		{ value: "pepper", label: "Перец острыйс колумбийской морковкой (30г) + 17 грн" }
	];

	constructor(
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(({ placeId, categoryId }) => {
				this._breadcrumbsService.setBackUrl(
					CLIENT_ROUTES.PRODUCTS.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categoryId)
				);
			});

		this.counterFormControl.value$.pipe(untilDestroyed(this)).subscribe((count) => {
			console.log("count", count);
		});
	}
}
