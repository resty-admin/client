import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { ProductsService } from "src/app/features/products";
import { CATEGORY_ID, DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/actions";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
	readonly product$ = this._routerService.selectParams(DYNAMIC_ID.slice(1)).pipe(
		switchMap((id) => this._productsService.getProduct(id)),
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

	constructor(
		private readonly _productsService: ProductsService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _activatedRoute: ActivatedRoute
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

		this._actionsService.setAction({
			label: "Подтвердить",
			action: () =>
				this.product$.pipe(take(1)).subscribe(async () => {
					const { categoryId, placeId } = this._activatedRoute.snapshot.params;
					await this._routerService.navigateByUrl(
						CLIENT_ROUTES.PRODUCTS.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categoryId)
					);
				})
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
