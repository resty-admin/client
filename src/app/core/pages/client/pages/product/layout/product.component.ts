import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest, map, switchMap, take } from "rxjs";
import { CATEGORY_ID, DYNAMIC_ID, PLACE_ID } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";
import { RouterService } from "src/app/shared/modules/router";

import { ActionsService } from "../../../../../../features/app";
import { OrdersService } from "../../../../../../features/orders";
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

	constructor(
		private readonly _productsPageGQL: ProductPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams()
			.pipe(untilDestroyed(this))
			.subscribe(async ({ placeId, categoryId, id }) => {
				await this._productPageQuery.setVariables({ productId: id });

				this._breadcrumbsService.setBackUrl(
					CLIENT_ROUTES.PRODUCTS.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categoryId)
				);
			});

		this._actionsService.setAction({
			label: "Подтвердить",
			action: () => {
				combineLatest([this.product$, this._ordersService.activeOrderId$])
					.pipe(
						take(1),
						switchMap(([product, activeOrderId]) =>
							this._ordersService.addProductToOrder({
								productId: product.id,
								orderId: activeOrderId!,
								attrs: [this.attributesFormControl.value]
							})
						),
						take(1),
						map((result) => result.data?.addProductToOrder)
					)
					.subscribe(async () => {
						const { id, categoryId } = this._routerService.getParams();

						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.PRODUCTS.absolutePath.replace(CATEGORY_ID, categoryId).replace(DYNAMIC_ID, id)
						);
					});
			}
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBackUrl(null);
		this._actionsService.setAction(null);
	}
}
