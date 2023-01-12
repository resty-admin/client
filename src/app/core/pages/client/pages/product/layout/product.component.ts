import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { CATEGORY_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { FORM_I18N } from "../../../../../constants";
import { PRODUCT_PAGE_I18N } from "../constants";
import { ProductPageGQL } from "../graphql/product-page";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
	readonly productPageI18n = PRODUCT_PAGE_I18N;
	readonly formI18n = FORM_I18N;
	private readonly _productPageQuery = this._productsPageGQL.watch();
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

	constructor(
		private readonly _productsPageGQL: ProductPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(async ({ placeId, categoryId, dynamicId }) => {
				await this._productPageQuery.setVariables({ productId: dynamicId });

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
